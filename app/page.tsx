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
    <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 relative">
          <div className="inline-block relative">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-[#0a0a0a] mb-4 relative z-10">
              Book by 30
            </h1>
            {/* Underline decoration */}
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#f4e8c1] opacity-60 -rotate-1 rounded-sm" />
          </div>
          <p className="font-body text-lg text-[#666] mt-8 max-w-2xl mx-auto leading-relaxed">
            A scrapbook collage of writing by{" "}
            <span className="font-display text-xl text-[#0a0a0a]">Huiru Huang</span>
            <br />
            <span className="text-sm">
              Short stories, film commentary, literary analysis, and essays
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

        {/* About section */}
        <div className="mt-24 max-w-2xl mx-auto">
          <div className="relative bg-white p-8 shadow-md border border-[#e8dcc4]/30 rotate-[-0.5deg]">
            {/* Tape decoration */}
            <div className="absolute -top-3 right-12 w-20 h-6 bg-[#c8e3f5] opacity-70 rounded-sm" />
            
            <h2 className="font-display text-3xl text-[#0a0a0a] mb-4">
              About
            </h2>
            <div className="font-body text-[#3a3a3a] leading-relaxed space-y-3">
              <p>
                This is a collection of writing—fiction, criticism, and essays—exploring
                memory, consciousness, and the spaces between what we say and what we mean.
              </p>
              <p className="text-sm text-[#666] italic">
                Website in progress. More pieces coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
