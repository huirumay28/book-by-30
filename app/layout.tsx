import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const dosis = Dosis({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ru's Writing Desk",
  description: "Personal writing discipline tool — daily logs, writing tasks, and submission tracking",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dosis.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
