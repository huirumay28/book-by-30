"use client";

import Link from "next/link";
import Image from "next/image";
import { Work, categoryLabels } from "@/types";

interface WorkCardProps {
  work: Work;
  index: number;
}

const rotations = [
  "rotate-[-2deg]",
  "rotate-[1deg]",
  "rotate-[-1deg]",
  "rotate-[2deg]",
  "rotate-[0deg]",
  "rotate-[-1.5deg]",
  "rotate-[1.5deg]",
  "rotate-[-0.5deg]",
];

const tapeColors = [
  "bg-[#f4e8c1]",
  "bg-[#ffd6e8]",
  "bg-[#c8e3f5]",
  "bg-[#e8f5e8]",
];

const paperColors = [
  "bg-[#fefdfb]",
  "bg-[#faf8f5]",
  "bg-[#f9f7f4]",
  "bg-[#ffffff]",
];

const categoryColors: Record<string, string> = {
  "short-stories": "bg-[#ffd6e8] text-[#8b2e5f]",
  "film-music": "bg-[#c8e3f5] text-[#1e4d7b]",
  "literary-analysis": "bg-[#e8f5e8] text-[#2d5a2d]",
  essays: "bg-[#f4e8c1] text-[#8b6914]",
};

export default function WorkCard({ work, index }: WorkCardProps) {
  const rotation = rotations[index % rotations.length];
  const tapeColor = tapeColors[index % tapeColors.length];
  const paperColor = paperColors[index % paperColors.length];
  const categoryColor = categoryColors[work.category] || tapeColors[0];

  return (
    <Link href={`/work/${work.slug}`} className="group block">
      <article
        className={`relative ${rotation} ${paperColor} p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] hover:rotate-0 cursor-pointer h-full border border-[#e8dcc4]/30`}
      >
        {/* Washi tape at top */}
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${tapeColor} opacity-70 rounded-sm`}
          style={{
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
          }}
        />

        {/* Polaroid-style image */}
        {work.image && (
          <div className="relative mb-4 bg-white p-2 shadow-sm">
            <Image
              src={`/images/${work.image}`}
              alt={work.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Category tag */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColor}`}>
          {categoryLabels[work.category]}
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl mb-2 text-[#0a0a0a] leading-tight">
          {work.title}
        </h2>

        {/* Date */}
        <p className="text-sm text-[#666] mb-3 font-body">
          {new Date(work.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Excerpt */}
        <p className="text-[#3a3a3a] leading-relaxed font-body text-sm line-clamp-3">
          {work.excerpt}
        </p>

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </article>
    </Link>
  );
}
