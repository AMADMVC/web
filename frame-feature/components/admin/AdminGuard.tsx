"use client";

import React, { useState, useEffect } from "react";
import { Lock, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminGuardProps {
  children: React.ReactNode;
}

// Studio passcode (configured via .env.local or fallback)
const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "admin123";

export function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if admin is already unlocked in this browser session
    const authStatus = sessionStorage.getItem("frame_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem("frame_admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect Passcode. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("frame_admin_auth");
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center text-zinc-500 text-sm">
        Verifying security clearance...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#0A0A0C] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#121316] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl text-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />

          <div className="w-14 h-14 rounded-2xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,94,20,0.25)]">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Private Studio Access</h1>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              This area is restricted. Enter your private studio passcode to create and publish content.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
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

            <Button type="submit" className="w-full" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Unlock Private Studio
            </Button>
          </form>

          <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted Session &bull; Private Studio Access</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Private Admin Indicator Bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#FF5E14] text-black text-xs font-extrabold py-1 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>PRIVATE ADMIN STUDIO &bull; LOGGED IN</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-black text-white hover:bg-zinc-900 px-3 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider cursor-pointer"
        >
          Lock / Logout
        </button>
      </div>

      <div className="pt-6">{children}</div>
    </>
  );
}
