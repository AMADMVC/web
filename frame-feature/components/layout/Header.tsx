"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo (Left) */}
          <Logo size="md" />

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-zinc-900/70 border border-white/8 backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <button
                      onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isMegaMenuOpen || isActive
                          ? "bg-white/10 text-[#FF7A1A]"
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180 text-[#FF5E14]" : ""
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.35)]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Connect
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <div onMouseLeave={() => setIsMegaMenuOpen(false)}>
              <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
