"use client";

import React, { useState, useEffect } from "react";
import { Lock, KeyRound, ArrowRight, ShieldCheck, Mail, UserCheck, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/authContext";

interface AdminGuardProps {
  children: React.ReactNode;
}

// Fallback studio passcode (configured via .env.local or fallback)
const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "admin123";

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, profile, role, isAdmin, loading, signIn, signOut } = useAuth();
  const [sessionUnlocked, setSessionUnlocked] = useState<boolean | null>(null);

  // Form states
  const [authMode, setAuthMode] = useState<"email" | "passcode">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if session fallback is active
    const authStatus = typeof window !== "undefined" ? sessionStorage.getItem("frame_admin_auth") : null;
    if (authStatus === "true") {
      setSessionUnlocked(true);
    } else {
      setSessionUnlocked(false);
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password. Please verify credentials.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasscodeUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem("frame_admin_auth", "true");
      setSessionUnlocked(true);
      setError("");
    } else {
      setError("Incorrect Passcode. Access denied.");
    }
  };

  const handleLogout = async () => {
    if (user) {
      await signOut();
    }
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("frame_admin_auth");
    }
    setSessionUnlocked(false);
  };

  const isAccessGranted = isAdmin || sessionUnlocked === true;

  if (loading && sessionUnlocked === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center gap-3 text-zinc-400 text-sm">
        <div className="w-8 h-8 rounded-full border-2 border-[#FF5E14] border-t-transparent animate-spin" />
        <span>Verifying security credentials...</span>
      </div>
    );
  }

  if (!isAccessGranted) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#0A0A0C] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl text-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />

          <div className="w-14 h-14 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,94,20,0.25)]">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Studio Administration</h1>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Authenticate with your Admin credentials to access CMS controls, content moderation, and metrics.
            </p>
          </div>

          {/* Auth Mode Tabs */}
          <div className="flex rounded-xl bg-zinc-950 p-1 border border-white/5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setAuthMode("email"); setError(""); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === "email"
                  ? "bg-[#FF5E14] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Email &amp; Password
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode("passcode"); setError(""); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === "passcode"
                  ? "bg-[#FF5E14] text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Passcode
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-medium text-left flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {authMode === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="admin@framefeature.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-2"
                size="md"
                disabled={submitting}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {submitting ? "Authenticating..." : "Sign In with Firebase"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasscodeUnlock} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Studio Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Enter Studio Passcode..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Unlock Studio
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Role-Based Access Control &bull; Firebase Protected</span>
          </div>
        </div>
      </div>
    );
  }

  const roleLabel = role === "superadmin" ? "SUPERADMIN" : sessionUnlocked ? "SESSION ADMIN" : "ADMIN";

  return (
    <>
      {/* Top Private Admin Indicator Bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#FF5E14] text-black text-xs font-extrabold py-1 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="tracking-wide">STUDIO CMS &bull; {roleLabel}</span>
          {user?.email && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/10 text-[10px] font-mono">
              {user.email}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="bg-black text-white hover:bg-zinc-900 px-3 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider cursor-pointer transition-colors"
          >
            Lock / Logout
          </button>
        </div>
      </div>

      <div className="pt-6">{children}</div>
    </>
  );
}
