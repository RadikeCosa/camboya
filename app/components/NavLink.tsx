import Link from "next/link";
import { NavItem } from "../config/navigation";

interface NavLinkProps {
  item: NavItem;
  className?: string;
  showIcon?: boolean;
  iconSize?: "sm" | "md";
  onClick?: () => void;
}

export default function NavLink({
  item,
  className = "nav-link",
  showIcon = true,
  iconSize = "md",
  onClick,
}: NavLinkProps) {
  const iconSizeClass = iconSize === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {showIcon && (
        <svg
          className={iconSizeClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={item.icon}
          />
        </svg>
      )}
      {item.label}
    </Link>
  );
}
