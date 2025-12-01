import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full h-16 flex items-center justify-between px-6 border-t"
      style={{
        background: "var(--background-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className="text-sm"
          style={{ color: "var(--foreground-muted)" }}
        >
          © 2024 My App. Todos los derechos reservados.
        </span>
      </div>
      <nav className="flex items-center gap-4">
        <Link
          href="/ESAS"
          className="text-sm transition-colors hover:underline"
          style={{ color: "var(--foreground-muted)" }}
        >
          ESAS
        </Link>
        <Link
          href="/data-viz"
          className="text-sm transition-colors hover:underline"
          style={{ color: "var(--foreground-muted)" }}
        >
          Data Viz
        </Link>
      </nav>
    </footer>
  );
}
