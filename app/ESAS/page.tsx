"use client";

import Link from "next/link";
import ESASForm from "./components/ESASForm";

export default function ESASPage() {
  return (
    <main className="p-4 md:p-8 w-full overflow-y-auto">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors"
          style={{ color: "var(--foreground-muted)" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Inicio
        </Link>
        <span style={{ color: "var(--foreground-muted)" }}>/</span>
        <span style={{ color: "var(--foreground-strong)" }} className="font-medium">
          ESAS Assessment
        </span>
      </nav>

      <ESASForm />

      {/* Quick navigation */}
      <div className="max-w-2xl mx-auto mt-6 flex justify-center">
        <Link
          href="/ESAS/results"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{
            color: "var(--accent)",
            background: "var(--background-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Ver resultados guardados
        </Link>
      </div>
    </main>
  );
}
