import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/utils/blogStorage";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Clock,
  Calendar,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
} from "lucide-react";
import { headers } from "next/headers";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Frame Feature",
      description: "The requested article could not be found.",
    };
  }

  const metaTitle = post.metaTitle || `${post.title} | Frame Feature`;
  const metaDescription = post.metaDescription || post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const shareUrl = `${protocol}://${host}/blog/${post.slug}`;

  // Markdown parser into JSX
  const renderFormattedBody = (markdown: string) => {
    const lines = markdown.split("\n");
    return lines.map((line, idx) => {
      // H2 Heading
      if (line.startsWith("## ")) {
        const headingText = line.replace("## ", "").trim();
        const headingId = headingText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return (
          <h2
            key={idx}
            id={headingId}
            className="text-2xl sm:text-3xl font-black text-white mt-12 mb-4 tracking-tight scroll-mt-28"
          >
            {headingText}
          </h2>
        );
      }

      // H3 Heading
      if (line.startsWith("### ")) {
        const headingText = line.replace("### ", "").trim();
        return (
          <h3
            key={idx}
            className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 tracking-tight"
          >
            {headingText}
          </h3>
        );
      }

      // Blockquote
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={idx}
            className="my-8 p-6 rounded-2xl bg-zinc-900/80 border-l-4 border-l-[#FF5E14] text-zinc-200 text-base sm:text-lg italic leading-relaxed shadow-lg"
          >
            {renderInline(line.replace("> ", ""))}
          </blockquote>
        );
      }

      // Divider
      if (line.trim() === "---") {
        return <hr key={idx} className="my-10 border-white/10" />;
      }

      // Bullet List
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li
            key={idx}
            className="ml-6 list-disc text-zinc-300 my-2 text-base sm:text-lg leading-relaxed marker:text-[#FF5E14]"
          >
            {renderInline(line.substring(2))}
          </li>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(line)) {
        return (
          <li
            key={idx}
            className="ml-6 list-decimal text-zinc-300 my-2 text-base sm:text-lg leading-relaxed marker:text-[#FF5E14] marker:font-bold"
          >
            {renderInline(line.replace(/^\d+\.\s/, ""))}
          </li>
        );
      }

      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-4" />;
      }

      // Paragraph
      return (
        <p
          key={idx}
          className="text-zinc-300 my-3 text-base sm:text-lg leading-relaxed font-normal"
        >
          {renderInline(line)}
        </p>
      );
    });
  };

  // Inline formatting helper
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-extrabold text-white text-base sm:text-lg">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-zinc-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-2 py-0.5 rounded-md bg-zinc-800 border border-white/10 text-[#FF7A1A] font-mono text-sm"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="pt-32 pb-24 bg-[#0A0A0C] min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          segments={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* ARTICLE HEADER */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3">
            <Badge variant="orange" icon={<Sparkles className="w-3.5 h-3.5" />}>
              {post.category}
            </Badge>
            <span className="text-xs text-zinc-500 font-semibold">&bull;</span>
            <span className="text-xs text-zinc-400 font-semibold">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#FF5E14]/40">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">{post.author.name}</div>
                <div className="text-[11px] text-zinc-500">{post.author.role}</div>
              </div>
            </div>

            <span>&bull;</span>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FF5E14]" />
              <span>{post.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* FEATURED COVER IMAGE */}
        <div className="relative w-full h-72 sm:h-[480px] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl bg-zinc-950">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* MAIN 2-COL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
          {/* Main Article Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hook Excerpt Quote */}
            {post.excerpt && (
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/8 text-zinc-200 text-lg sm:text-xl font-medium leading-relaxed italic border-l-4 border-l-[#FF5E14]">
                &ldquo;{post.excerpt}&rdquo;
              </div>
            )}

            {/* Formatted Content Body */}
            <div className="prose-dark">{renderFormattedBody(post.rawContent)}</div>

            {/* Tags & Social Share */}
            <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12">
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/8 text-xs text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-zinc-400 flex items-center gap-1.5 mr-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#FF5E14]" />
                  Share:
                </span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${post.title} - ${shareUrl}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-[#25D366] text-zinc-400 hover:text-white transition-colors border border-white/5 flex items-center justify-center"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-[#1A1A1A] hover:text-white text-zinc-400 transition-colors border border-white/5 flex items-center justify-center"
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-[#1877F2] hover:text-white text-zinc-400 transition-colors border border-white/5 flex items-center justify-center"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-[#0A66C2] hover:text-white text-zinc-400 transition-colors border border-white/5 flex items-center justify-center"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar: Table of Contents & Quick Action (4 Cols) */}
          <div className="lg:col-span-4 space-y-8 sticky top-28">
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4 shadow-xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {post.tableOfContents.map((toc, idx) => (
                    <a
                      key={idx}
                      href={`#${toc.id}`}
                      className="block text-xs sm:text-sm text-zinc-400 hover:text-white hover:translate-x-1 transition-all py-1"
                    >
                      {toc.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Author Card Box */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF5E14]/40">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{post.author.name}</div>
                  <div className="text-xs text-zinc-400">{post.author.role}</div>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Exploring the intersection of photography, short-form frames, and AI workflows.
              </p>
              <Button href="/contact" size="sm" className="w-full">
                Connect &amp; Collaborate
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between mb-16">
          <Link
            href="/blog"
            className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <Button href="/blog/new" size="sm">
            + Publish Another Post
          </Button>
        </div>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <h2 className="text-2xl font-black text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group rounded-3xl bg-zinc-900/60 border border-white/10 p-6 hover:border-[#FF5E14]/40 transition-all flex items-center gap-6 shadow-xl"
                >
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-950">
                    <Image src={rel.coverImage} alt={rel.title} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#FF7A1A] uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF7A1A] transition-colors mt-1 line-clamp-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
