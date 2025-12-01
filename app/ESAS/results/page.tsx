"use client";

import React from "react";
import Link from "next/link";
import ESASResultList from "../components/ESASResultList";
import { useESASResults } from "../hooks/useESASResults";

export default function ESASResultsPage() {
  const { assessments, deleteAll, deleteOne } = useESASResults();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 transition-colors"
          style={{ color: "var(--foreground-muted)" }}
        >
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Inicio
        </Link>
        <span style={{ color: "var(--foreground-muted)" }}>/</span>
        <Link
          href="/ESAS"
          className="transition-colors hover:underline"
          style={{ color: "var(--foreground-muted)" }}
        >
          ESAS
        </Link>
        <span style={{ color: "var(--foreground-muted)" }}>/</span>
        <span
          style={{ color: "var(--foreground-strong)" }}
          className="font-medium"
        >
          Resultados
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--foreground-strong)" }}
          >
            Registros ESAS
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--foreground-muted)" }}
          >
            {mounted ? (
              <>
                {assessments.length} evaluación
                {assessments.length !== 1 ? "es" : ""} guardada
                {assessments.length !== 1 ? "s" : ""}
              </>
            ) : (
              "Cargando..."
            )}
          </p>
        </div>
        <Link
          href="/ESAS"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={{ background: "var(--gradient-accent)" }}
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nueva evaluación
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div
          className="text-center py-16 px-4 rounded-xl border-2 border-dashed"
          style={{
            borderColor: "var(--border-color)",
            background: "var(--background-secondary)",
          }}
        >
          <svg
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "var(--foreground-muted)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p
            className="text-lg font-medium"
            style={{ color: "var(--foreground)" }}
          >
            No hay evaluaciones guardadas
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            Completa el formulario ESAS para comenzar a registrar evaluaciones.
          </p>
          <Link
            href="/ESAS"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{
              color: "var(--accent)",
              background: "var(--background)",
              border: "1px solid var(--border-color)",
            }}
          >
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Crear primera evaluación
          </Link>
        </div>
      ) : (
        <>
          <ESASResultList assessments={assessments} onDelete={deleteOne} />

          <div
            className="flex justify-end mt-8 pt-6 border-t"
            style={{ borderColor: "var(--border-color)" }}
          >
            <button
              onClick={deleteAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
              style={{
                color: "var(--error)",
                background: "var(--error-light)",
              }}
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Borrar todos los registros
            </button>
          </div>
        </>
      )}
    </div>
  );
}
