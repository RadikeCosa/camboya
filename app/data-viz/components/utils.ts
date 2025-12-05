/**
 * @fileoverview Funciones de utilidad para el módulo data-viz.
 */

import { Problem } from "./types";

/**
 * Formatea una fecha ISO a formato dd/mm/yy.
 * Uses UTC methods to ensure consistent output between server and client,
 * avoiding timezone-related date shifts.
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Fecha formateada como dd/mm/yy
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

/**
 * Mapping array for Spanish day-of-week names.
 * Index corresponds to Date.getUTCDay() (0 = Sunday, 6 = Saturday).
 */
const SPANISH_DAYS_OF_WEEK = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

/**
 * Obtiene el nombre del día de la semana en español.
 * This function uses a deterministic mapping array instead of toLocaleDateString
 * to ensure consistent output between server and client (hydration safety).
 * Uses getUTCDay() to avoid timezone-related day shifts.
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Nombre del día de la semana en español
 */
export function formatDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return SPANISH_DAYS_OF_WEEK[date.getUTCDay()];
}

/**
 * Normaliza un título reemplazando guiones por espacios
 * y capitalizando la primera letra de cada palabra.
 * @param title - Título con guiones (slug)
 * @returns Título normalizado para mostrar al usuario
 */
export function normalizeTitle(title: string): string {
  return title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Agrupa los problemas por fecha de creación.
 * @param problemList - Array de problemas a agrupar
 * @returns Objeto con fechas como claves y arrays de problemas como valores
 */
export function groupByDate(problemList: Problem[]): Record<string, Problem[]> {
  const map: Record<string, Problem[]> = {};
  problemList.forEach((p) => {
    const date = formatDate(p.createdAt);
    if (!map[date]) map[date] = [];
    map[date].push(p);
  });
  return map;
}

/**
 * Obtiene los estilos de color para el badge de dificultad.
 * @param difficulty - Nivel de dificultad del problema
 * @returns Objeto con bgcolor y color para el badge
 */
export function getDifficultyBadgeStyle(difficulty: string): {
  bgcolor: string;
  color: string;
} {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return { bgcolor: "#dcfce7", color: "#166534" };
    case "medium":
      return { bgcolor: "#fef3c7", color: "#92400e" };
    case "hard":
      return { bgcolor: "#fee2e2", color: "#991b1b" };
    default:
      return { bgcolor: "#f3f4f6", color: "#4b5563" };
  }
}
