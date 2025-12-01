import Link from "next/link";
import NavLink from "./NavLink";
import { headerSections } from "../config/navigation";

export default function Header() {
  return (
    <header
      className="w-full h-16 flex items-center justify-between px-6 border-b"
      style={{
        background: "var(--background-secondary)",
        borderColor: "var(--border-color)",
        height: "var(--header-height)",
      }}
    >
      {/* Logo/Brand */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold"
        style={{
          background: "var(--gradient-primary)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <span className="text-2xl">🚀</span>
        My App
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        {headerSections.map((section) => (
          <NavLink
            key={section.href}
            item={{
              href: section.href,
              label: section.nav.shortLabel || section.nav.label,
              Icon: section.Icon,
            }}
            className="nav-link text-sm"
            iconSize="sm"
          />
        ))}
      </nav>
    </header>
  );
}
