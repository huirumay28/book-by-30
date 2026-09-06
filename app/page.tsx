"use client";

import { useState } from "react";
import WorkCard from "@/components/WorkCard";
import CategoryFilter from "@/components/CategoryFilter";
import { works } from "@/data/works";
import { Category } from "@/types";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const filteredWorks =
    selectedCategory === "all"
      ? works
      : works.filter((work) => work.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#ebe9e3] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - editorial masthead style */}
        <header className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-black mb-4 relative z-10 font-bold leading-none tracking-tight">
              Book by 30
            </h1>
            {/* Bold underline - editorial style */}
            <div className="absolute -bottom-1 left-0 right-0 h-2 bg-[#ff1744]" />
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-black" />
          </div>
          <p className="font-body text-base text-black mt-10 max-w-2xl mx-auto leading-relaxed">
            A COLLAGE OF WRITING BY{" "}
            <span className="font-display text-2xl text-black font-bold">Huiru Huang</span>
            <br />
            <span className="text-sm uppercase tracking-wider font-bold mt-2 inline-block">
              Short stories • Film commentary • Literary analysis • Essays
            </span>
          </p>
        </header>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {filteredWorks.map((work, index) => (
            <div
              key={work.slug}
              className="min-h-[280px]"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <WorkCard work={work} index={index} />
            </div>
          ))}
        </div>

        {/* About section - case file style */}
        <div className="mt-24 max-w-2xl mx-auto">
          <div className="relative bg-[#fafaf8] p-8 shadow-[6px_6px_0_rgba(0,0,0,0.2)] border-2 border-black rotate-[-1deg]">
            {/* Case number label */}
            <div className="absolute -top-4 -left-4 px-4 py-2 bg-[#ff1744] text-white font-body font-bold text-xs uppercase tracking-wider shadow-md">
              CASE FILE
            </div>
            
            <h2 className="font-display text-4xl text-black mb-4 font-bold border-b-2 border-black pb-2">
              About
            </h2>
            <div className="font-body text-black leading-relaxed space-y-3">
              <p>
                This is a collection of writing—fiction, criticism, and essays—exploring
                memory, consciousness, and the spaces between what we say and what we mean.
              </p>
              <p className="text-sm text-gray-700 uppercase tracking-wide font-bold mt-4 pt-4 border-t border-gray-300">
                ⚠ Website in progress • More pieces coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
