export type Category = "short-stories" | "film-music" | "literary-analysis" | "essays";

export interface Work {
  slug: string;
  title: string;
  category: Category;
  date: string;
  excerpt: string;
  body: string;
  image?: string;
}

export const categoryLabels: Record<Category, string> = {
  "short-stories": "Short Stories",
  "film-music": "Film & Music",
  "literary-analysis": "Literary Analysis",
  "essays": "Essays",
};
