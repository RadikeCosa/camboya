// Nombres de pacientes y profesional para el formulario ESAS
export const ESAS_PATIENT_NAMES = ["Juan Perez", "Ana Gonzalez"];
export const ESAS_PROFESSIONAL_NAME = "Dr. Cito";
export const ESAS_SYMPTOM_LABELS: Record<string, string> = {
  dolor: "Dolor",
  fatiga: "Fatiga",
  náusea: "Náusea",
  depresión: "Depresión",
  ansiedad: "Ansiedad",
  somnolencia: "Somnolencia",
  apetito: "Apetito",
  bienestar: "Bienestar",
  disnea: "Disnea",
  otros: "Otros",
};

export const ESAS_FORM_TEXT = {
  title: "Evaluación de Síntomas (ESAS)",
  save: "Guardar evaluación",
  notes: "Notas adicionales",
  success: "¡Evaluación guardada exitosamente!",
  error: "Error al guardar la evaluación. Intente nuevamente.",
};

export const ESAS_STORAGE_KEY = "esas_v1";
export const ESAS_DATA_VERSION = "1.0";
export const ESAS_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 días
