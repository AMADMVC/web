"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

function XTwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 1.46-1.46c0-.81-.66-1.47-1.46-1.47a1.47 1.47 0 0 0-1.47 1.47c0 .8.66 1.46 1.47 1.46m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#08080A] text-zinc-400 border-t border-white/8 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#FF5E14]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter & Hook Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 text-[#FF7A1A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Visual Thinking &times; AI Execution
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Frame Feature
            </h3>
            <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
              Exploring how cameras, editing, and AI tools combine to turn ideas into clear, compelling visual content and structured storytelling.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You&apos;re subscribed to new notes and visual studies.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter email to follow work..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14] transition-all"
                />
                <Button type="submit" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Follow Notes
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Multi-column Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Brand & Bio (2 cols on md) */}
          <div className="col-span-2 space-y-4">
            <Logo size="md" showTagline={false} />
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Not just writing &mdash; but structuring ideas so people understand faster, connect better, and remember clearly with AI acceleration.
            </p>

            {/* Official Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/frame.features/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-[#E1306C] text-zinc-400 hover:text-white border border-white/8 transition-all"
                title="Instagram @frame.features"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://x.com/FrameFeature"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-white/8 transition-all"
                title="X (Twitter) @FrameFeature"
                aria-label="X Twitter"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/frame-feature"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-[#0A66C2] text-zinc-400 hover:text-white border border-white/8 transition-all"
                title="LinkedIn Frame Feature"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/917827677476"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-[#25D366] text-zinc-400 hover:text-white border border-white/8 transition-all"
                title="WhatsApp +91 7827677476"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#FF7A1A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#FF7A1A] transition-colors">
                  Work (Experiments)
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#FF7A1A] transition-colors">
                  Visual Output
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FF7A1A] transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/work-with-me" className="hover:text-[#FF7A1A] transition-colors">
                  Work With Me
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF7A1A] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <a href="mailto:framefeature1@gmail.com" className="hover:text-white transition-colors truncate">
                  framefeature1@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF5E14] shrink-0" />
                <a href="tel:+917827677476" className="hover:text-white transition-colors">
                  +91 7827677476
                </a>
              </li>
              <li className="pt-1">
                <Link href="/contact" className="text-[#FF7A1A] font-bold hover:underline flex items-center gap-1">
                  <span>Send a Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Final Brand Line */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Frame Feature. All visual experiments &amp; documentation.
          </div>
          <div className="text-zinc-400 font-bold text-sm tracking-wide">
            Visual Thinking <span className="text-[#FF5E14]">&times;</span> AI Execution
          </div>
        </div>
      </div>
    </footer>
  );
}
