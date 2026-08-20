"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export type UserRole = "superadmin" | "admin" | null;

export interface UserProfile {
  uid: string;
  email: string | null;
  role: UserRole;
  displayName?: string | null;
  createdAt?: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  registerUser: (email: string, pass: string, role?: "admin" | "superadmin") => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  role: null,
  isAdmin: false,
  isSuperAdmin: false,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  registerUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Fetch role from Firestore "users" collection
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            const userRole = (data.role as UserRole) || "admin";
            setRole(userRole);
            setProfile({
              uid: currentUser.uid,
              email: currentUser.email,
              role: userRole,
              displayName: data.displayName || currentUser.displayName,
              createdAt: data.createdAt,
            });
          } else {
            // First time login or fallback - default to admin and create doc
            const defaultRole: UserRole = "admin";
            await setDoc(
              userDocRef,
              {
                email: currentUser.email,
                role: defaultRole,
                createdAt: serverTimestamp(),
              },
              { merge: true }
            );
            setRole(defaultRole);
            setProfile({
              uid: currentUser.uid,
              email: currentUser.email,
              role: defaultRole,
            });
          }
        } catch (error) {
          console.error("Error fetching user profile/role:", error);
          // Fallback: If logged in with Firebase Auth, grant admin role
          setRole("admin");
          setProfile({
            uid: currentUser.uid,
            email: currentUser.email,
            role: "admin",
          });
        }
      } else {
        setProfile(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
      setRole(null);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("ff_admin_unlocked");
      }
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    email: string,
    pass: string,
    targetRole: "admin" | "superadmin" = "admin"
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await setDoc(doc(db, "users", cred.user.uid), {
        email: cred.user.email,
        role: targetRole,
        createdAt: serverTimestamp(),
      });
    }
  };

  const isAdmin = role === "admin" || role === "superadmin";
  const isSuperAdmin = role === "superadmin";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        isAdmin,
        isSuperAdmin,
        loading,
        signIn,
        signOut,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
