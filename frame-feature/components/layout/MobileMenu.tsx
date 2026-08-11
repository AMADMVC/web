"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, megaMenuData } from "@/data/navigation";
import { X, ChevronDown, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#101114] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/8">
                <div onClick={onClose}>
                  <Logo size="sm" showTagline={false} />
                </div>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-2">
                {navItems.map((item, idx) => {
                  if (item.hasMegaMenu) {
                    return (
                      <div key={idx} className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden">
                        <button
                          onClick={() => setServicesExpanded(!servicesExpanded)}
                          className="w-full flex items-center justify-between p-3.5 text-left font-bold text-white cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#FF5E14]" />
                            {item.name}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-zinc-400 transition-transform ${
                              servicesExpanded ? "rotate-180 text-[#FF5E14]" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3"
                            >
                              <div className="text-[11px] font-bold uppercase text-[#FF7A1A] tracking-wider">
                                What We Do
                              </div>
                              <div className="space-y-1.5 pl-2">
                                {megaMenuData.leftSide.whatWeDo.map((s, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={s.href}
                                    onClick={onClose}
                                    className="block text-xs text-zinc-400 hover:text-white py-1"
                                  >
                                    {s.title}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className="block px-4 py-3 rounded-xl font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/8 space-y-3">
              <Button href="/contact" className="w-full" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Send a Message
              </Button>
              <Button
                variant="whatsapp"
                href="https://wa.me/1234567890?text=Hi%2C%20I'd%20like%20to%20connect%20with%20Frame%20Feature."
                external
                className="w-full"
                size="md"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Direct WhatsApp
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
