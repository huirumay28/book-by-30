"use client";

import { Category, categoryLabels } from "@/types";

interface CategoryFilterProps {
  selectedCategory: Category | "all";
  onSelectCategory: (category: Category | "all") => void;
}

const categories: Array<Category | "all"> = [
  "all",
  "short-stories",
  "film-music",
  "literary-analysis",
  "essays",
];

const categoryStyles: Record<Category | "all", string> = {
  all: "bg-[#0a0a0a] text-white",
  "short-stories": "bg-[#ffd6e8] text-[#8b2e5f]",
  "film-music": "bg-[#c8e3f5] text-[#1e4d7b]",
  "literary-analysis": "bg-[#e8f5e8] text-[#2d5a2d]",
  essays: "bg-[#f4e8c1] text-[#8b6914]",
};

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const label = category === "all" ? "All" : categoryLabels[category];
        const style = categoryStyles[category];

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-5 py-2.5 rounded-full font-body font-medium text-sm
              transition-all duration-300 border-2
              ${
                isSelected
                  ? `${style} border-current scale-105 shadow-md`
                  : "bg-white text-[#666] border-[#e8dcc4] hover:border-current hover:scale-105"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
