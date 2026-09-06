"use client";

import Link from "next/link";
import Image from "next/image";
import { Work, categoryLabels } from "@/types";

interface WorkCardProps {
  work: Work;
  index: number;
}

const rotations = [
  "rotate-[-3deg]",
  "rotate-[2deg]",
  "rotate-[-1.5deg]",
  "rotate-[3deg]",
  "rotate-[-2deg]",
  "rotate-[1deg]",
  "rotate-[2.5deg]",
  "rotate-[-2.5deg]",
];

const accents = [
  { color: "bg-[#ff1744]", style: "paper-clip" },
  { color: "bg-[#2e7d32]", style: "bold-tape" },
  { color: "bg-black", style: "binder-holes" },
  { color: "bg-[#ff1744]", style: "torn-edge" },
];

const paperColors = [
  "bg-[#fafaf8]",
  "bg-[#f5f3ed]",
  "bg-[#ffffff]",
  "bg-[#ebe9e3]",
];

const categoryColors: Record<string, string> = {
  "short-stories": "bg-[#ff1744] text-white",
  "film-music": "bg-black text-white",
  "literary-analysis": "bg-[#2e7d32] text-white",
  essays: "bg-white text-black border-2 border-black",
};

export default function WorkCard({ work, index }: WorkCardProps) {
  const rotation = rotations[index % rotations.length];
  const accent = accents[index % accents.length];
  const paperColor = paperColors[index % paperColors.length];
  const categoryColor = categoryColors[work.category] || "bg-black text-white";

  return (
    <Link href={`/work/${work.slug}`} className="group block">
      <article
        className={`relative ${rotation} ${paperColor} ${accent.style} p-6 
        shadow-[4px_4px_0_rgba(0,0,0,0.2)] 
        hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] 
        transition-all duration-200 
        hover:scale-[1.03] hover:rotate-0 
        cursor-pointer h-full 
        border-2 border-black`}
      >
        {/* Bold stamp/label at top corner */}
        <div
          className="absolute -top-3 -right-3 px-3 py-1 bg-black text-white font-body font-bold text-xs uppercase tracking-wider rotate-12 shadow-md"
        >
          #{index + 1}
        </div>

        {/* Polaroid-style image with overlapping effect */}
        {work.image && (
          <div className="relative mb-4 bg-white p-3 border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] -ml-2 -mr-2">
            <Image
              src={`/images/${work.image}`}
              alt={work.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover grayscale-[20%] contrast-[1.1]"
            />
            <div className="absolute top-2 right-2 w-16 h-6 bg-[#ff1744] opacity-20 rotate-45" />
          </div>
        )}

        {/* Category label - editorial style */}
        <div className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 ${categoryColor}`}>
          {categoryLabels[work.category]}
        </div>

        {/* Title - bold black */}
        <h2 className="font-display text-2xl mb-2 text-black leading-tight font-bold">
          {work.title}
        </h2>

        {/* Date - typewriter style */}
        <p className="text-xs text-gray-600 mb-3 font-body uppercase tracking-wide">
          {new Date(work.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Excerpt */}
        <p className="text-black leading-relaxed font-body text-sm line-clamp-3">
          {work.excerpt}
        </p>

        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </article>
    </Link>
  );
}
