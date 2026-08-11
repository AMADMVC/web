"use client";

import { useEffect, useState } from "react";

/**
 * AdminOnly — Renders children ONLY when the admin session is active.
 * Public visitors see nothing. No loading flicker after hydration.
 */
export function AdminOnly({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Only runs on client — sessionStorage is not available on server
    const auth = sessionStorage.getItem("frame_admin_auth");
    setIsAdmin(auth === "true");
  }, []);

  if (!isAdmin) return null;
  return <>{children}</>;
}
