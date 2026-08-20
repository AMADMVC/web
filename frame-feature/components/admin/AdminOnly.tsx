"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authContext";

/**
 * AdminOnly — Renders children ONLY when the admin session is active (Firebase Auth or Session Auth).
 * Public visitors see nothing. No loading flicker after hydration.
 */
export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { isAdmin: isAuthAdmin, loading } = useAuth();
  const [isSessionAdmin, setIsSessionAdmin] = useState(false);

  useEffect(() => {
    // Check fallback session storage
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("frame_admin_auth");
      setIsSessionAdmin(auth === "true");
    }
  }, []);

  if (loading) return null;
  if (!isAuthAdmin && !isSessionAdmin) return null;

  return <>{children}</>;
}
