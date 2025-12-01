import Link from "next/link";

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

        <Link href="/" className="nav-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Inicio
        </Link>

        <p
          className="px-3 py-2 mt-4 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--foreground-muted)" }}
        >
          Herramientas
        </p>

        <Link href="/ESAS" className="nav-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          ESAS Assessment
        </Link>

        <Link href="/ESAS/results" className="nav-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          ESAS Resultados
        </Link>

        <Link href="/data-viz" className="nav-link">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Data Visualization
        </Link>
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
