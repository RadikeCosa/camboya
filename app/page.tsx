import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            background: "var(--gradient-primary)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Bienvenido a My App
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--foreground-muted)" }}
        >
          Una plataforma integral para evaluaciones médicas ESAS y visualización
          de datos de programación. Selecciona una herramienta para comenzar.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* ESAS Card */}
        <Link
          href="/ESAS"
          className="card card-hover group p-6 block"
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "var(--gradient-primary)" }}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "var(--foreground-strong)" }}
          >
            ESAS Assessment Tool
          </h2>
          <p className="mb-4" style={{ color: "var(--foreground-muted)" }}>
            Escala de Evaluación de Síntomas de Edmonton. Registra y monitorea
            síntomas de pacientes de forma sistemática.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{
                background: "var(--success-light)",
                color: "var(--success)",
              }}
            >
              Evaluación
            </span>
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{
                background: "var(--warning-light)",
                color: "var(--warning)",
              }}
            >
              Monitoreo
            </span>
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ background: "var(--info-light)", color: "var(--info)" }}
            >
              Médico
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
            style={{ color: "var(--accent)" }}
          >
            Ir a ESAS
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </Link>

        {/* Data Viz Card */}
        <Link
          href="/data-viz"
          className="card card-hover group p-6 block"
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "var(--gradient-accent)" }}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "var(--foreground-strong)" }}
          >
            Data Visualization
          </h2>
          <p className="mb-4" style={{ color: "var(--foreground-muted)" }}>
            Visualiza tu progreso en ejercicios de programación con una línea
            de tiempo interactiva y estadísticas detalladas.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ background: "var(--info-light)", color: "var(--info)" }}
            >
              Timeline
            </span>
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{
                background: "var(--success-light)",
                color: "var(--success)",
              }}
            >
              Estadísticas
            </span>
            <span
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{
                background: "var(--warning-light)",
                color: "var(--warning)",
              }}
            >
              Progreso
            </span>
          </div>
          <span
            className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all"
            style={{ color: "var(--accent)" }}
          >
            Ir a Data Viz
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </Link>
      </section>

      {/* Quick Links Section */}
      <section
        className="card p-6"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              ¿Listo para comenzar?
            </h3>
            <p className="text-white/80">
              Accede rápidamente a las funcionalidades principales.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ESAS"
              className="px-5 py-2.5 rounded-lg bg-white font-semibold transition-transform hover:scale-105"
              style={{ color: "var(--accent)" }}
            >
              Nueva Evaluación
            </Link>
            <Link
              href="/ESAS/results"
              className="px-5 py-2.5 rounded-lg bg-white/20 text-white font-semibold border border-white/30 transition-transform hover:scale-105"
            >
              Ver Resultados
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
