import NavLink from "./NavLink";
import { mainNavItems, toolNavItems } from "../config/navigation";

export default function Sidebar() {
  return (
    <aside
      className="h-full flex flex-col border-r"
      style={{
        width: "var(--sidebar-width)",
        background: "var(--background-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-1">
        <p
          className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--foreground-muted)" }}
        >
          Navegación
        </p>

        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        <p
          className="px-3 py-2 mt-4 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--foreground-muted)" }}
        >
          Herramientas
        </p>

        {toolNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Footer Section */}
      <div
        className="p-4 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div
          className="rounded-lg p-3"
          style={{
            background: "var(--gradient-primary)",
          }}
        >
          <p className="text-white text-sm font-medium">¿Necesitas ayuda?</p>
          <p className="text-white/80 text-xs mt-1">
            Explora las herramientas disponibles
          </p>
        </div>
      </div>
    </aside>
  );
}
