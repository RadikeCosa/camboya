import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({
  href,
  children,
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-lg rounded-xl border font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[--accent] hover:text-[--accent-foreground] border-[--accent] text-[--accent] bg-[--background] tracking-wide ${className}`}
      style={{ fontFamily: "var(--font-header)" }}
    >
      {children}
    </Link>
  );
}
