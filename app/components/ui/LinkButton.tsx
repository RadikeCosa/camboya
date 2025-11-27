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
      className={`px-[calc(var(--spacing-lg)*1.05)] py-[calc(var(--spacing-md)*1.05)] text-lg rounded-xl border border-[--accent] text-[--accent] bg-[--background] shadow-lg hover:bg-[--accent] hover:text-[--accent-foreground] hover:scale-105 transition-all duration-200 font-bold tracking-wide ${className}`}
      style={{ fontFamily: "var(--font-header)" }}
    >
      {children}
    </Link>
  );
}
