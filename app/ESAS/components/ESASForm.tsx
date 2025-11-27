"use client";
import React from "react";
import { ESASSymptomNames } from "../esas.types";
import { ESAS_SYMPTOM_LABELS, ESAS_FORM_TEXT } from "../esas.constants";
import { ESAS_PATIENT_NAMES, ESAS_PROFESSIONAL_NAME } from "../esas.constants";
import { useESAS } from "../hooks/useESAS";
import SymptomSlider from "./SymptomSlider";
import NotesField from "./NotesField";
import FormActions from "./FormActions";
import StatusMessage from "./StatusMessage";

export default function ESASForm() {
  // Estado para errores de validación
  const [formError, setFormError] = React.useState<string | null>(null);
  // Estado local para fecha y hora
  const [dateTime, setDateTime] = React.useState(() => {
    const now = new Date();
    // Formato ISO para input type="datetime-local"
    return now.toISOString().slice(0, 16);
  });
  // Estado local para paciente y profesional
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

  return (
    <form
      aria-label={ESAS_FORM_TEXT.title}
      onSubmit={(e) => {
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
        const now = new Date();
        const selectedDate = new Date(dateTime);
        if (selectedDate > now) {
          setFormError("La fecha y hora no pueden ser futuras.");
          return;
        }
        setFormError(null);
        saveAssessment(patient, professional, dateTime);
      }}
      className="max-w-xl mx-auto p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Campo de fecha y hora de la evaluación */}
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
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[--accent] text-base"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />
      </div>
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
      <div>
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
          if (val.length > 500) return;
          setNotes(val);
        }}
        label={ESAS_FORM_TEXT.notes}
      />
      {/* Campo de selección de profesional */}
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

      {/* Mensajes de estado y acciones */}
      {/* Mensaje de error de validación */}
      {formError && (
        <div
          className="text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-300 rounded-lg px-4 py-2 shadow-sm mb-4"
          role="alert"
          aria-live="assertive"
        >
          {formError}
        </div>
      )}
      <StatusMessage
        success={success}
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
