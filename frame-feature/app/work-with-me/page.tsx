import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, Camera, Cpu, Layers, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work With Me | Frame Feature",
  description:
    "I collaborate on work where visuals, content, and AI come together. No fixed packages.",
};

export default function WorkWithMePage() {
  const areas = [
    {
      id: "visual",
      title: "Visual Content",
      icon: Camera,
      points: ["Photography", "Short-form video", "Visual storytelling"],
      desc: "Creating distinct visual frames that cut through digital noise.",
    },
    {
      id: "ai",
      title: "AI + Content",
      icon: Cpu,
      points: ["Idea generation", "Content structure", "Prompt workflows"],
      desc: "Harnessing generative AI tools to rapidly prototype and scale concepts.",
    },
    {
      id: "clarity",
      title: "Content Clarity",
      icon: Layers,
      points: [
        "Simplifying ideas",
        "Structuring communication",
        "Making content easier to understand",
      ],
      desc: "Removing unnecessary complexity so your audience actually understands.",
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Work With Me" }]} />

        {/* HERO */}
        <div className="space-y-6 mb-20">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Collaboration
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Work With Me
          </h1>

          <div className="space-y-4 text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed">
            <p className="text-zinc-400">I don&apos;t offer fixed packages.</p>
            <p className="text-white font-bold text-2xl sm:text-3xl text-[#FF7A1A]">
              But I collaborate on work where visuals, content, and AI come together.
            </p>
          </div>
        </div>

        {/* AREAS I CAN HELP WITH */}
        <div className="mb-24 space-y-8">
          <div className="border-b border-white/8 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Areas I Can Help With
            </h2>
          </div>

          <div className="space-y-6">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.id}
                  id={area.id}
                  className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 hover:border-[#FF5E14]/40 transition-all duration-300 scroll-mt-28"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-3.5 rounded-2xl bg-zinc-800 text-[#FF5E14] shrink-0 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-bold text-white">{area.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{area.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {area.points.map((pt, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 text-xs font-semibold text-zinc-200 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14]" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-white/10 mb-20 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            How It Works
          </h2>

          <p className="text-lg sm:text-xl text-zinc-200">
            You explain what you&apos;re trying to create.
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              We figure out:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "What format works",
                "What tools to use",
                "What output makes sense",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-950 border border-white/5 text-sm font-bold text-white flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FF5E14]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="rounded-3xl bg-zinc-950 border border-[#FF5E14]/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="text-3xl font-black text-white">
            Start with a simple message.
          </h3>
          <p className="text-zinc-400 text-base max-w-md mx-auto">
            No formal brief needed. Just tell me what you&apos;re thinking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/contact" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Send a Message
            </Button>
            <Button
              variant="whatsapp"
              href="https://wa.me/1234567890?text=Hi%2C%20I%20have%20an%20idea%20I%20want%20to%20create%20and%20wanted%20to%20collaborate."
              external
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Direct WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
