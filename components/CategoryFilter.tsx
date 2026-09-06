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
  all: "bg-black text-white border-2 border-black",
  "short-stories": "bg-[#ff1744] text-white border-2 border-black",
  "film-music": "bg-white text-black border-2 border-black",
  "literary-analysis": "bg-[#2e7d32] text-white border-2 border-black",
  essays: "bg-[#f5f3ed] text-black border-2 border-black",
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
              px-5 py-2.5 font-body font-bold text-sm uppercase tracking-wide
              transition-all duration-200
              ${
                isSelected
                  ? `${style} scale-105 shadow-[3px_3px_0_rgba(0,0,0,1)]`
                  : "bg-white text-black border-2 border-black hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
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
