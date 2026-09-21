"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Today" },
    { href: "/writing", label: "Writing" },
    { href: "/submissions", label: "Submissions" },
    { href: "/inspo", label: "Inspo" },
    { href: "/log", label: "Log" },
  ];

  return (
    <nav className="bg-[var(--bg-panel)] border-b-2 border-[var(--border-dark)] sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[var(--accent-pink)] border border-[var(--border-dark)]"></div>
            <h1 className="text-sm font-semibold text-[var(--text-black)] tracking-wide hidden sm:block">
              RU'S WRITING DESK
            </h1>
            <h1 className="text-sm font-semibold text-[var(--text-black)] tracking-wide sm:hidden">
              DESK
            </h1>
          </div>
          <div className="flex gap-0">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 sm:px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                    isActive
                      ? "border-[var(--accent-blue)] text-[var(--accent-blue)]"
                      : "border-transparent text-[var(--text-gray)] hover:text-[var(--text-black)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
