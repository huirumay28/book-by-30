import type { Metadata } from "next";
import { Caveat, Dosis } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dosis = Dosis({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Book by 30 | Huiru Huang",
  description: "A scrapbook collage of writing by Huiru Huang — short stories, film commentary, literary analysis, and essays",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${dosis.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
