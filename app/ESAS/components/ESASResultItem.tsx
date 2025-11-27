import React from "react";
import { ESASAssessment } from "../esas.types";

interface ESASResultItemProps {
  assessment: ESASAssessment;
  onDelete: (id: string) => void;
}

export default function ESASResultItem({
  assessment,
  onDelete,
}: ESASResultItemProps) {
  return (
    <li className="relative border rounded-lg p-4 bg-gray-50">
      <button
        aria-label="Borrar registro"
        onClick={() => onDelete(assessment.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg font-bold px-2"
        style={{ background: "none", border: "none" }}
      >
        ×
      </button>
      <div>
        <strong>Fecha:</strong> {assessment.dateTime}
      </div>
      <div>
        <strong>Paciente:</strong> {assessment.patient}
      </div>
      <div>
        <strong>Profesional:</strong> {assessment.professional}
      </div>
      <div>
        <strong>Síntomas:</strong>{" "}
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(assessment.symptoms, null, 2)}
        </pre>
      </div>
      {assessment.notes && (
        <div>
          <strong>Notas:</strong> {assessment.notes}
        </div>
      )}
    </li>
  );
}
