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
  const IconComponent = item.Icon;

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {showIcon && <IconComponent className={iconSizeClass} />}
      {item.label}
    </Link>
  );
}
