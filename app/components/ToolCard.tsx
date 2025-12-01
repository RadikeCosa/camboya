import Link from "next/link";
import { ToolItem } from "../config/navigation";
import { ArrowIcon } from "../icons";

interface ToolCardProps {
  tool: ToolItem;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const gradientVar =
    tool.gradient === "primary"
      ? "var(--gradient-primary)"
      : "var(--gradient-accent)";

  const IconComponent = tool.Icon;

  return (
    <Link
      href={tool.href}
      className="card card-hover group p-6 block"
      style={{ textDecoration: "none" }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
        style={{ background: gradientVar }}
      >
        <IconComponent className="w-7 h-7 text-white" />
      </div>
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "var(--foreground-strong)" }}
      >
        {tool.label}
      </h2>
      <p className="mb-4" style={{ color: "var(--foreground-muted)" }}>
        {tool.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.tags.map((tag, index) => {
          const colorStyles = {
            success: {
              background: "var(--success-light)",
              color: "var(--success)",
            },
            warning: {
              background: "var(--warning-light)",
              color: "var(--warning)",
            },
            info: {
              background: "var(--info-light)",
              color: "var(--info)",
            },
          };

          return (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={colorStyles[tag.colorType]}
            >
              {tag.label}
            </span>
          );
        })}
      </div>
      <span
        className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
        style={{ color: "var(--accent)" }}
      >
        {tool.linkText}
        <ArrowIcon className="w-4 h-4" />
      </span>
    </Link>
  );
}
