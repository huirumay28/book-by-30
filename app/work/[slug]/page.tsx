import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
    "short-stories": "bg-[#ff1744] text-white",
    "film-music": "bg-black text-white",
    "literary-analysis": "bg-[#2e7d32] text-white",
    essays: "bg-white text-black border-2 border-black",
  };

  return (
    <div className="min-h-screen bg-[#ebe9e3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button - editorial style */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body font-bold text-black hover:text-[#ff1744] transition-colors mb-8 group uppercase tracking-wide text-sm"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          ← Index
        </Link>

        {/* Main content card - file dossier style */}
        <article className="relative bg-[#fafaf8] p-8 md:p-12 shadow-[8px_8px_0_rgba(0,0,0,0.2)] border-2 border-black rotate-[-0.5deg] binder-holes">
          {/* File tabs/labels */}
          <div className="absolute -top-4 left-20 px-4 py-1 bg-[#ff1744] text-white font-body font-bold text-xs uppercase tracking-wider rotate-[-2deg] shadow-md">
            DOCUMENT
          </div>
          <div className="absolute -top-4 right-24 px-4 py-1 bg-black text-white font-body font-bold text-xs uppercase tracking-wider rotate-[3deg] shadow-md">
            {work.slug.split("-").length} PAGES
          </div>

          {/* Polaroid-style image with bolder treatment */}
          {work.image && (
            <div className="relative mb-8 bg-white p-4 shadow-[4px_4px_0_rgba(0,0,0,1)] border-2 border-black mx-auto max-w-md rotate-[-2deg]">
              <Image
                src={`/images/${work.image}`}
                alt={work.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover grayscale-[20%] contrast-[1.1]"
              />
              <div className="mt-3 text-center font-body text-xs font-bold uppercase tracking-wider">
                {categoryLabels[work.category]}
              </div>
            </div>
          )}

          {/* Category label - bold stamp style */}
          <div
            className={`inline-block px-4 py-2 text-xs font-bold uppercase tracking-widest mb-6 ${
              categoryColor[work.category]
            }`}
          >
            {categoryLabels[work.category]}
          </div>

          {/* Title - bold editorial */}
          <h1 className="font-display text-5xl md:text-6xl text-black mb-4 leading-tight font-bold border-b-4 border-black pb-4">
            {work.title}
          </h1>

          {/* Date - typewriter/file stamp style */}
          <p className="font-body text-black mb-8 text-sm uppercase tracking-wider font-bold">
            FILE DATE: {new Date(work.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).toUpperCase()}
          </p>

          {/* Divider - bold black line */}
          <div className="relative mb-8">
            <div className="h-1 bg-black" />
          </div>

          {/* Body - editorial column style */}
          <div className="prose prose-lg max-w-none font-body">
            {work.body.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-black leading-relaxed mb-6 first:text-xl first:font-bold"
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

        {/* More works section - filing system style */}
        <div className="mt-16">
          <h2 className="font-display text-4xl text-black mb-6 text-center font-bold uppercase tracking-tight border-t-2 border-b-2 border-black py-4">
            More Files
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {works
              .filter((w) => w.slug !== work.slug)
              .slice(0, 3)
              .map((relatedWork, index) => (
                <Link
                  key={relatedWork.slug}
                  href={`/work/${relatedWork.slug}`}
                  className="group block bg-[#fafaf8] p-5 shadow-[4px_4px_0_rgba(0,0,0,0.2)] border-2 border-black hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] transition-all duration-200 rotate-[-1deg] hover:rotate-0 hover:scale-[1.02]"
                >
                  <div
                    className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2 ${
                      categoryColor[relatedWork.category]
                    }`}
                  >
                    {categoryLabels[relatedWork.category]}
                  </div>
                  <h3 className="font-display text-xl text-black mb-2 font-bold">
                    {relatedWork.title}
                  </h3>
                  <p className="font-body text-sm text-black line-clamp-2">
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
