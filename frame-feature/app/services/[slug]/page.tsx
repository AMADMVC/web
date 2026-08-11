import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | FRAME Studio`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          segments={[
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        {/* HERO SECTION */}
        <div className="max-w-4xl mb-20">
          <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {service.category} &bull; {service.tag}
          </Badge>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mt-5 leading-tight">
            {service.title}
          </h1>
          <p className="text-zinc-300 text-lg sm:text-xl mt-6 leading-relaxed">
            {service.fullDesc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              href="/contact"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get Custom Quote
            </Button>
            <Button
              variant="whatsapp"
              href={`https://wa.me/1234567890?text=Hi%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(
                service.title
              )}%20service.`}
              external
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Inquire via WhatsApp
            </Button>
          </div>
        </div>

        {/* BENEFITS BENCHMARK METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {service.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 text-center space-y-2 hover:border-[#FF5E14]/30 transition-all"
            >
              <div className="text-4xl sm:text-5xl font-black text-[#FF5E14]">
                {benefit.metric}
              </div>
              <div className="text-lg font-bold text-white">{benefit.title}</div>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CORE FEATURES GRID */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Core Capabilities &amp; Specifications
            </h2>
            <p className="text-zinc-400 text-base mt-2">
              Everything included in our full-cycle engineering delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-zinc-900/60 border border-white/8 flex items-start gap-5 hover:border-[#FF5E14]/40 transition-all"
              >
                <div className="p-3.5 rounded-2xl bg-zinc-800 text-[#FF5E14] shrink-0 shadow-lg">
                  <DynamicIcon name={feat.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-STEP WORKFLOW TIMELINE */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Sprint Execution Workflow
            </h2>
            <p className="text-zinc-400 text-base mt-2">
              How we execute this service from Day 1 to production release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.workflow.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-zinc-900/50 border border-white/8 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#FF7A1A] mb-4">{step.step}</div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-semibold text-zinc-500">
                  Sprint Milestone #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTEXTUAL FAQS */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={service.faqs} />
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="rounded-3xl bg-zinc-900/90 border border-white/10 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent" />
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to deploy {service.title}?
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto mt-3">
            Schedule a technical strategy sprint with our leads and get your fixed milestone roadmap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              Start Project Inquiry
            </Button>
            <Button
              variant="whatsapp"
              href={`https://wa.me/1234567890?text=Hi%2C%20let's%20discuss%20${encodeURIComponent(
                service.title
              )}.`}
              external
              size="lg"
            >
              Direct WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
