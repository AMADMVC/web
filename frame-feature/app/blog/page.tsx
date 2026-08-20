import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/utils/blogStorage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, Clock, Calendar, ArrowRight, PenSquare, Search, Tag } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Visual Insights | Frame Feature",
  description:
    "Explore in-depth articles on AI workflows, visual storytelling, photography composition, and content structure.",
};
export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb segments={[{ label: "Blog & Insights" }]} />

        {/* HERO HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Visual Thinking &times; AI Execution
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Blog &amp; Insights
            </h1>

            <p className="text-lg text-zinc-300 leading-relaxed">
              In-depth articles, case breakdowns, and practical workflows on how cameras, AI tools, and structure combine to build impactful visual content.
            </p>
          </div>
        </div>

        {/* FEATURED HERO POST */}
        {featuredPost && (
          <div className="mb-20">
            <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A] mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Article</span>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-3xl bg-zinc-900/60 border border-white/10 overflow-hidden hover:border-[#FF5E14]/50 transition-all duration-300 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Image (6 Cols) */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[340px] bg-zinc-950 overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[#FF7A1A] text-xs font-bold uppercase border border-[#FF5E14]/30">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Details (5 Cols) */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF5E14]" />
                        {featuredPost.publishedAt}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FF7A1A] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#FF5E14]/40">
                        <Image
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-white">
                        {featuredPost.author.name}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#FF7A1A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div className="mb-24 space-y-8">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">All Articles</h2>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"} Published
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="p-16 rounded-3xl bg-zinc-900/40 border border-white/10 text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">No articles published yet</h3>
              <p className="text-zinc-400 text-sm max-w-md mx-auto">
                Be the first to publish a post using the manual Blog Publisher Studio.
              </p>
              <Button href="/blog/new" size="md">
                + Create First Post
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl bg-zinc-900/60 border border-white/10 overflow-hidden hover:border-[#FF5E14]/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative h-56 w-full bg-zinc-950 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FF7A1A] text-xs font-bold uppercase border border-[#FF5E14]/30">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                        <span>{post.publishedAt}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-[#FF7A1A] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4 pt-4 text-xs">
                    <span className="text-zinc-400 font-medium">By {post.author.name}</span>
                    <span className="text-[#FF7A1A] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
