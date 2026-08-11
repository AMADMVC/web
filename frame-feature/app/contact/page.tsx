"use client";

import React, { useState } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  MessageCircle,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    thinking: "",
    wantToCreate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = `Hi Frame Feature, my name is ${formData.name || "[Name]"}. I'm thinking about: ${
    formData.thinking || "[Idea]"
  }. I want to create: ${formData.wantToCreate || "[Project]"}.`;

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Contact" }]} />

        {/* HERO */}
        <div className="space-y-6 mb-16">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Direct Line
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Let&apos;s Connect
          </h1>

          <div className="text-lg sm:text-xl text-zinc-300 space-y-4 leading-relaxed">
            <p className="text-zinc-400">
              If you&apos;re working on something involving:
            </p>
            <div className="flex flex-wrap gap-2 text-sm font-bold text-white">
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-800 border border-white/5">
                Visual Content
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#FF5E14]/20 border border-[#FF5E14]/30 text-[#FF7A1A]">
                AI Workflows
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-zinc-800 border border-white/5">
                Content Structure
              </span>
            </div>
            <p className="text-white font-semibold pt-1">
              You can reach out directly.
            </p>
          </div>
        </div>

        {/* DIRECT CONTACT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {/* Phone / WhatsApp */}
          <a
            href="https://wa.me/917827677476?text=Hi%20Frame%20Feature%2C%20I%20visited%20your%20website%20and%20wanted%20to%20connect."
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-[#25D366] transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-bold uppercase block">Phone / WhatsApp</span>
              <span className="text-base font-black text-white group-hover:text-[#25D366] transition-colors">
                +91 7827677476
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:framefeature1@gmail.com"
            className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-[#FF5E14] transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FF5E14]/20 text-[#FF5E14] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-bold uppercase block">Direct Email</span>
              <span className="text-sm sm:text-base font-black text-white group-hover:text-[#FF7A1A] transition-colors truncate block max-w-[220px]">
                framefeature1@gmail.com
              </span>
            </div>
          </a>
        </div>

        {/* KEEP IT SIMPLE & FORM */}
        <div className="rounded-3xl bg-zinc-900/70 border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden mb-16">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />

          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FF5E14]/20 border border-[#FF5E14]/40 text-[#FF5E14] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,94,20,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Message Received!</h3>
              <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                Thanks, <span className="text-white font-bold">{formData.name}</span>. I received your note and will get back to you shortly at <span className="text-[#FF7A1A]">{formData.email}</span>.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="secondary" size="md">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
                  Keep It Simple
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  No formal process. Just share:
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  1. What you&apos;re thinking:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="The concept, idea, or challenge you have in mind..."
                  value={formData.thinking}
                  onChange={(e) => setFormData({ ...formData, thinking: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  2. What you want to create:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="A video series, AI workflow, photo frames, content clarity..."
                  value={formData.wantToCreate}
                  onChange={(e) => setFormData({ ...formData, wantToCreate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button type="submit" size="lg" className="flex-1" icon={<Send className="w-4 h-4" />}>
                  Send a message. We&apos;ll figure it out.
                </Button>

                <Button
                  type="button"
                  variant="whatsapp"
                  href={`https://wa.me/917827677476?text=${encodeURIComponent(whatsappMessage)}`}
                  external
                  size="lg"
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  Direct WhatsApp
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* SOCIAL CHANNELS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://www.instagram.com/frame.features/"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 hover:border-[#E1306C]/40 flex items-center justify-between text-xs text-zinc-400 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#E1306C]/15 text-[#E1306C]">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-white group-hover:text-[#E1306C] transition-colors">
                @frame.features
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://x.com/FrameFeature"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 hover:border-white/40 flex items-center justify-between text-xs text-zinc-400 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 text-white">
                <XTwitterIcon className="w-4 h-4" />
              </div>
              <span className="font-bold text-white group-hover:text-zinc-200 transition-colors">
                @FrameFeature
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://www.linkedin.com/company/frame-feature"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-zinc-950/80 border border-white/5 hover:border-[#0A66C2]/40 flex items-center justify-between text-xs text-zinc-400 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 0 0 1.46-1.46c0-.81-.66-1.47-1.46-1.47a1.47 1.47 0 0 0-1.47 1.47c0 .8.66 1.46 1.47 1.46m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </div>
              <span className="font-bold text-white group-hover:text-[#0A66C2] transition-colors">
                LinkedIn
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
