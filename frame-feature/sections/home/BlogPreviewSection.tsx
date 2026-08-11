"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock, Sparkles } from "lucide-react";

export function BlogPreviewSection() {
  return (
    <section className="relative py-28 bg-[#0A0A0C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Engineering &amp; Insights
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
              Latest from the <span className="orange-gradient-text">Research Lab</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl">
              In-depth architectural patterns, 3D WebGL optimization, and programmatic growth strategies.
            </p>
          </div>

          <Button href="/blog" variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Read All Articles
          </Button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between rounded-3xl bg-zinc-900/60 border border-white/8 overflow-hidden hover:border-[#FF5E14]/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-52 w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#FF7A1A] border border-[#FF5E14]/30 text-xs font-bold uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mb-3">
                    <span>{post.publishedAt}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#FF5E14]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF7A1A] transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-300">{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#FF7A1A] hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
