/**
 * @fileoverview Funciones de utilidad para el módulo data-viz.
 */

import { Problem } from "./types";

/**
 * Formatea una fecha ISO a formato dd/mm/yy.
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Fecha formateada como dd/mm/yy
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

/**
 * Mapping array for Spanish day-of-week names.
 * Index corresponds to Date.getDay() (0 = Sunday, 6 = Saturday).
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
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Nombre del día de la semana en español
 */
export function formatDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return SPANISH_DAYS_OF_WEEK[date.getDay()];
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
