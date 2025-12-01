/**
 * @fileoverview Funciones de utilidad para el componente de línea de tiempo.
 * Incluye funciones para formateo de fechas, normalización de texto y mapeo de colores.
 */

import type { Problem, ExerciseStats, GroupedProblems } from "./types";

/**
 * Formatea una fecha ISO a formato dd/mm/yy.
 * Utiliza UTC para evitar inconsistencias entre servidor y cliente.
 *
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Fecha formateada como dd/mm/yy
 *
 * @example
 * formatDate("2025-01-15") // "15/01/25"
 */
export function formatDate(dateStr: string): string {
  // Usamos UTC para evitar problemas de zona horaria
  // entre el servidor y el cliente
  const date = new Date(dateStr + "T00:00:00Z");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

/**
 * Obtiene el nombre del día de la semana en español.
 * Utiliza un mapeo manual para evitar problemas de locale en el servidor.
 *
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Nombre del día de la semana en español
 *
 * @example
 * formatDayOfWeek("2025-01-15") // "miércoles"
 */
export function formatDayOfWeek(dateStr: string): string {
  // Mapeo manual de días para evitar problemas de locale
  // en server components (toLocaleDateString puede dar resultados diferentes)
  const days = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const date = new Date(dateStr + "T00:00:00Z");
  return days[date.getUTCDay()];
}

/**
 * Normaliza un título reemplazando guiones por espacios
 * y capitalizando la primera letra de cada palabra.
 *
 * @param title - Título con guiones (slug)
 * @returns Título normalizado para mostrar al usuario
 *
 * @example
 * normalizeTitle("two-sum") // "Two Sum"
 */
export function normalizeTitle(title: string): string {
  return title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Obtiene el color de Material UI correspondiente a un nivel de dificultad.
 *
 * @param difficulty - Nivel de dificultad (easy, medium, hard)
 * @returns Color de Material UI para el Chip
 */
export function getDifficultyColor(
  difficulty: string
): "success" | "warning" | "error" | "default" {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "success"; // Verde - problemas fáciles
    case "medium":
      return "warning"; // Naranja - problemas intermedios
    case "hard":
      return "error"; // Rojo - problemas difíciles
    default:
      return "default";
  }
}

/**
 * Obtiene el color hexadecimal correspondiente a una fuente de problemas.
 * Cada plataforma tiene su color de marca característico.
 *
 * @param source - Nombre de la fuente (leetcode, freecodecamp, etc.)
 * @returns Color hexadecimal
 */
export function getSourceColor(source: string): string {
  switch (source.toLowerCase()) {
    case "leetcode":
      return "#FFA116"; // Naranja característico de LeetCode
    case "freecodecamp":
      return "#0A0A23"; // Azul oscuro de freeCodeCamp
    default:
      return "#666"; // Gris para otras fuentes
  }
}

/**
 * Agrupa los problemas por fecha de creación.
 * Útil para mostrar los ejercicios organizados por día en la línea de tiempo.
 *
 * @param problems - Array de problemas a agrupar
 * @returns Objeto con fechas como claves y arrays de problemas como valores
 */
export function groupProblemsByDate(problems: Problem[]): GroupedProblems {
  const grouped: GroupedProblems = {};

  problems.forEach((problem) => {
    const date = formatDate(problem.createdAt);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(problem);
  });

  return grouped;
}

/**
 * Ordena los problemas por fecha de creación de más reciente a más antiguo.
 *
 * @param problems - Array de problemas sin ordenar
 * @returns Nuevo array de problemas ordenados por fecha descendente
 */
export function sortProblemsByDate(problems: Problem[]): Problem[] {
  return [...problems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Calcula estadísticas resumidas de los ejercicios.
 * Incluye totales, promedios y distribuciones por categoría.
 *
 * @param problems - Array de problemas para analizar
 * @param grouped - Problemas agrupados por fecha
 * @returns Objeto con todas las estadísticas calculadas
 */
export function calculateStats(
  problems: Problem[],
  grouped: GroupedProblems
): ExerciseStats {
  const dates = Object.keys(grouped);

  // Encontrar el día con más ejercicios
  let maxDayDate = "";
  let maxInOneDay = 0;

  dates.forEach((date) => {
    if (grouped[date].length > maxInOneDay) {
      maxInOneDay = grouped[date].length;
      maxDayDate = date;
    }
  });

  // Contar ejercicios por fuente
  const sourceCount: Record<string, number> = {};
  // Contar ejercicios por dificultad
  const difficultyCount: Record<string, number> = {};

  problems.forEach((problem) => {
    sourceCount[problem.source] = (sourceCount[problem.source] || 0) + 1;
    difficultyCount[problem.difficulty] =
      (difficultyCount[problem.difficulty] || 0) + 1;
  });

  return {
    totalExercises: problems.length,
    activeDays: dates.length,
    maxInOneDay,
    maxDayDate,
    sourceCount,
    difficultyCount,
  };
}
