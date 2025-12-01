import Link from "next/link";
import NavLink from "./NavLink";
import { mainNavItems, toolNavItems } from "../config/navigation";

// For header, we only show main nav items and main tool items (not ESAS/results)
const headerToolItems = toolNavItems.filter(
  (item) => item.href === "/ESAS" || item.href === "/data-viz"
);

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
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            className="nav-link text-sm"
            iconSize="sm"
          />
        ))}
        {headerToolItems.map((item) => (
          <NavLink
            key={item.href}
            item={{ ...item, label: item.shortLabel || item.label }}
            className="nav-link text-sm"
            iconSize="sm"
          />
        ))}
      </nav>
    </header>
  );
}
