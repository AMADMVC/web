import React from "react";
import Image from "next/image";
import { getAllTeamMembers } from "@/utils/teamStorage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Layers } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Team & Leadership | FRAME Studio",
  description:
    "Meet the systems architects, 3D artists, and growth specialists behind FRAME Digital Engineering Studio.",
};

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
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

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers(false);
  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Team & Leadership" }]} />

        {/* HERO BANNER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Minds Behind the Code
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-5">
            World-Class Engineers &amp; <br />
            <span className="orange-gradient-text">Spatial Designers</span>
          </h1>
          <p className="text-zinc-400 text-lg mt-4 leading-relaxed">
            A multidisciplinary squad of senior architects, 3D WebGL creators, and growth engineers dedicated to building category-defining digital products.
          </p>
        </div>

        {/* TEAM MEMBERS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-zinc-900/60 border border-white/8 p-8 sm:p-10 hover:border-[#FF5E14]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Info */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#FF5E14]/30 shrink-0 shadow-xl">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7A1A]">
                      {member.department}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">{member.name}</h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">{member.role}</p>

                    {/* Socials */}
                    <div className="flex items-center gap-2 mt-3">
                      {member.socials.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-[#FF5E14] transition-colors"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-[#FF5E14] transition-colors"
                        >
                          <TwitterIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Skills Tags */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">
                    Core Specializations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-md bg-zinc-800/90 text-zinc-300 text-xs font-medium border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Case Studies Shipped */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Layers className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Key Project:</span>
                  <span className="text-white font-semibold">{member.featuredProjects[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="rounded-3xl bg-zinc-900/90 border border-white/10 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Want to Collaborate with Our Core Squad?
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto mt-3">
            We operate as your dedicated innovation and engineering partners.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Start a Conversation
            </Button>
            <Button
              variant="whatsapp"
              href="https://wa.me/1234567890?text=Hi%2C%20I'd%20like%20to%20speak%20with%20your%20team."
              external
              size="lg"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
