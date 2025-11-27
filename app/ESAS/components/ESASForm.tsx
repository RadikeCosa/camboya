"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ESASSymptomNames } from "../esas.types";
import {
  ESAS_SYMPTOM_LABELS,
  ESAS_FORM_TEXT,
  ESAS_PATIENT_NAMES,
  ESAS_PROFESSIONAL_NAME,
} from "../esas.constants";
import { useESAS } from "../hooks/useESAS";
import SymptomSlider from "./SymptomSlider";
import NotesField from "./NotesField";
import FormActions from "./FormActions";
import StatusMessage from "./StatusMessage";

export default function ESASForm() {
  const router = useRouter();
  // Estado para errores de validación del formulario
  const [formError, setFormError] = React.useState<string | null>(null);
  // Estado para mostrar mensaje de éxito
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Fecha y hora actual (formato para input datetime-local)
  const [dateTime, setDateTime] = React.useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });

  // Selección de paciente y profesional
  const [patient, setPatient] = React.useState(ESAS_PATIENT_NAMES[0]);
  const [professional, setProfessional] = React.useState(
    ESAS_PROFESSIONAL_NAME
  );

  const {
    symptoms,
    notes,
    saving,
    error,
    success,
    updateSymptom,
    setNotes,
    saveAssessment,
    reset,
  } = useESAS();

  // Ocultar mensajes automáticamente
  React.useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  React.useEffect(() => {
    if (success && !formError) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        router.push("/ESAS/results");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [success, formError, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!patient) {
      setFormError("Debe seleccionar un paciente.");
      return;
    }
    if (!professional) {
      setFormError("Debe seleccionar un profesional.");
      return;
    }
    if (!dateTime) {
      setFormError("Debe ingresar la fecha y hora de la evaluación.");
      return;
    }

    const selectedDate = new Date(dateTime);
    const now = new Date();
    if (selectedDate > now) {
      setFormError("La fecha y hora no pueden ser futuras.");
      return;
    }

    setFormError(null);
    saveAssessment(patient, professional, dateTime);
  };

  return (
    <form
      aria-label={ESAS_FORM_TEXT.title}
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Fecha y hora */}
      <div className="mb-6">
        <label
          htmlFor="datetime"
          className="font-semibold block mb-2"
          style={{ color: "var(--foreground-strong)" }}
        >
          Fecha y hora de la evaluación
        </label>
        <input
          type="datetime-local"
          id="datetime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
          max={new Date().toISOString().slice(0, 16)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent] text-base"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />
      </div>

      {/* Paciente */}
      <div className="mb-6">
        <label
          htmlFor="patient"
          className="font-semibold block mb-2"
          style={{ color: "var(--foreground-strong)" }}
        >
          Paciente
        </label>
        <select
          id="patient"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent] text-base"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {ESAS_PATIENT_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Sliders de síntomas */}
      <div className="space-y-6 mb-8">
        {ESASSymptomNames.map((symptom) => (
          <SymptomSlider
            key={symptom}
            id={symptom}
            label={ESAS_SYMPTOM_LABELS[symptom]}
            value={symptoms[symptom]}
            onChange={(value) => updateSymptom(symptom, value)}
          />
        ))}
      </div>

      {/* Notas */}
      <NotesField
        value={notes}
        onChange={(val) => {
          if (val.length <= 500) setNotes(val);
        }}
        label={ESAS_FORM_TEXT.notes}
      />

      {/* Profesional */}
      <div className="mb-6">
        <label
          htmlFor="professional"
          className="font-semibold block mb-2"
          style={{ color: "var(--foreground-strong)" }}
        >
          Profesional
        </label>
        <select
          id="professional"
          value={professional}
          onChange={(e) => setProfessional(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent] text-base"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <option value={ESAS_PROFESSIONAL_NAME}>
            {ESAS_PROFESSIONAL_NAME}
          </option>
        </select>
      </div>

      {/* Mensajes de estado */}
      {formError && (
        <div
          className="text-red-600 bg-red-100 dark:bg-red-900/30 rounded-lg px-4 py-3 mb-4"
          role="alert"
          aria-live="assertive"
        >
          {formError}
        </div>
      )}

      {showSuccess && !formError && (
        <div
          className="text-green-700 bg-green-100 dark:bg-green-900/30 rounded-lg px-4 py-3 mb-4"
          role="status"
          aria-live="polite"
        >
          ¡Evaluación guardada exitosamente!
        </div>
      )}

      <StatusMessage
        success={false}
        error={error}
        successText={ESAS_FORM_TEXT.success}
        errorText={ESAS_FORM_TEXT.error}
      />

      <FormActions
        onSave={() => saveAssessment(patient, professional, dateTime)}
        onReset={reset}
        saving={saving}
        showReset={success}
        saveLabel={ESAS_FORM_TEXT.save}
        resetLabel="Nueva evaluación"
      />
    </form>
  );
}
