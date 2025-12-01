"use client";

import React from "react";
import Link from "next/link";
import ESASResultList from "../components/ESASResultList";
import { useESASResults } from "../hooks/useESASResults";

export default function ESASResultsPage() {
  const { assessments, deleteAll, deleteOne } = useESASResults();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Registros ESAS
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {assessments.length} evaluación{assessments.length !== 1 ? "es" : ""} guardada{assessments.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/ESAS"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva evaluación
        </Link>
      </div>

      {assessments.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
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
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No hay evaluaciones guardadas
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Completa el formulario ESAS para comenzar a registrar evaluaciones.
          </p>
        </div>
      ) : (
        <>
          <ESASResultList assessments={assessments} onDelete={deleteOne} />

          <div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={deleteAll}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Borrar todos los registros
            </button>
          </div>
        </>
      )}
    </div>
  );
}
