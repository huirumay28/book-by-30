import { notFound } from "next/navigation";
import Link from "next/link";
import { works } from "@/data/works";
import { categoryLabels } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  const categoryColor: Record<string, string> = {
    "short-stories": "bg-[#ffd6e8] text-[#8b2e5f]",
    "film-music": "bg-[#c8e3f5] text-[#1e4d7b]",
    "literary-analysis": "bg-[#e8f5e8] text-[#2d5a2d]",
    essays: "bg-[#f4e8c1] text-[#8b6914]",
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-[#666] hover:text-[#0a0a0a] transition-colors mb-8 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all works
        </Link>

        {/* Main content card */}
        <article className="relative bg-white p-8 md:p-12 shadow-lg border border-[#e8dcc4]/30 rotate-[-0.3deg]">
          {/* Washi tape decoration */}
          <div className="absolute -top-4 left-20 w-32 h-7 bg-[#f4e8c1] opacity-70 rounded-sm transform -rotate-2" />
          <div className="absolute -top-4 right-24 w-24 h-7 bg-[#ffd6e8] opacity-70 rounded-sm transform rotate-3" />

          {/* Category badge */}
          <div
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-body font-medium mb-6 ${
              categoryColor[work.category]
            }`}
          >
            {categoryLabels[work.category]}
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl text-[#0a0a0a] mb-4 leading-tight">
            {work.title}
          </h1>

          {/* Date */}
          <p className="font-body text-[#666] mb-8 text-lg">
            {new Date(work.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="h-px bg-[#e8dcc4]" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#c8e3f5] rotate-45" />
          </div>

          {/* Body */}
          <div className="prose prose-lg max-w-none font-body">
            {work.body.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-[#3a3a3a] leading-relaxed mb-6 first:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.012]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }}
          />
        </article>

        {/* More works section */}
        <div className="mt-16">
          <h2 className="font-display text-3xl text-[#0a0a0a] mb-6 text-center">
            More from this collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {works
              .filter((w) => w.slug !== work.slug)
              .slice(0, 3)
              .map((relatedWork, index) => (
                <Link
                  key={relatedWork.slug}
                  href={`/work/${relatedWork.slug}`}
                  className="group block bg-white p-5 shadow-md border border-[#e8dcc4]/30 hover:shadow-lg transition-all duration-300 rotate-[-0.5deg] hover:rotate-0 hover:scale-[1.02]"
                >
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-body font-medium mb-2 ${
                      categoryColor[relatedWork.category]
                    }`}
                  >
                    {categoryLabels[relatedWork.category]}
                  </div>
                  <h3 className="font-display text-xl text-[#0a0a0a] mb-2">
                    {relatedWork.title}
                  </h3>
                  <p className="font-body text-sm text-[#666] line-clamp-2">
                    {relatedWork.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
