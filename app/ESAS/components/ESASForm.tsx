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
  const [formError, setFormError] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const [dateTime, setDateTime] = React.useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });

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
      className="max-w-2xl mx-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <h1 className="text-xl font-bold text-white">{ESAS_FORM_TEXT.title}</h1>
        <p className="text-blue-100 text-sm mt-1">
          Escala de Evaluación de Síntomas de Edmonton
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Info del paciente y fecha */}
        <section className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Información General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="datetime"
                className="font-medium text-sm block mb-2"
                style={{ color: "var(--foreground-strong)" }}
              >
                Fecha y hora
              </label>
              <input
                type="datetime-local"
                id="datetime"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
                max={new Date().toISOString().slice(0, 16)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all"
                style={{
                  background: "var(--background)",
                  color: "var(--foreground)",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="patient"
                className="font-medium text-sm block mb-2"
                style={{ color: "var(--foreground-strong)" }}
              >
                Paciente
              </label>
              <select
                id="patient"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all"
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
          </div>
        </section>

        {/* Síntomas */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Evaluación de Síntomas
            </h2>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                0-3 Leve
              </span>
              <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                4-6 Moderado
              </span>
              <span className="px-2 py-1 rounded-full bg-red-100 text-red-700">
                7-10 Severo
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        </section>

        {/* Notas y profesional */}
        <section className="space-y-4">
          <NotesField
            value={notes}
            onChange={(val) => {
              if (val.length <= 500) setNotes(val);
            }}
            label={ESAS_FORM_TEXT.notes}
          />

          <div>
            <label
              htmlFor="professional"
              className="font-medium text-sm block mb-2"
              style={{ color: "var(--foreground-strong)" }}
            >
              Profesional responsable
            </label>
            <select
              id="professional"
              value={professional}
              onChange={(e) => setProfessional(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm transition-all"
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
        </section>

        {/* Mensajes de estado */}
        {formError && (
          <div
            className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-4 py-3 border border-red-200 dark:border-red-800"
            role="alert"
            aria-live="assertive"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{formError}</span>
          </div>
        )}

        {showSuccess && !formError && (
          <div
            className="flex items-center gap-2 text-green-700 bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-3 border border-green-200 dark:border-green-800"
            role="status"
            aria-live="polite"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">¡Evaluación guardada exitosamente!</span>
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
      </div>
    </form>
  );
}
