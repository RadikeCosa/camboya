"use client";

import React from "react";
// ...existing code...
import ESASResultList from "../components/ESASResultList";
import { useESASResults } from "../hooks/useESASResults";

export default function ESASResultsPage() {
  const { assessments, deleteAll, deleteOne } = useESASResults();

  // ...existing code...

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Registros ESAS guardados
      </h1>

      {assessments.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No hay evaluaciones guardadas aún.</p>
          <p className="mt-2 text-sm">
            Completa el formulario ESAS para comenzar.
          </p>
        </div>
      ) : (
        <>
          <ESASResultList assessments={assessments} onDelete={deleteOne} />

          <div className="flex justify-end mt-10">
            <button
              onClick={deleteAll}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 hover:scale-105 transition"
            >
              Borrar todos los registros
            </button>
          </div>
        </>
      )}
    </div>
  );
}
