/**
 * @fileoverview Barrel export para el módulo de línea de tiempo.
 * Exporta todos los componentes, tipos y utilidades del módulo.
 *
 * Este archivo facilita las importaciones desde otros módulos
 * permitiendo importar múltiples elementos con una sola línea.
 *
 * @example
 * import { ExerciseTimeline, ProblemCard, formatDate } from './timeline';
 */

// Componentes principales
export { ExerciseTimeline } from "./ExerciseTimeline";
export { ProblemCard } from "./ProblemCard";
export { SummaryCard } from "./SummaryCard";
export { TimelineNode } from "./TimelineNode";

// Tipos e interfaces
export type { Problem, ExerciseStats, GroupedProblems } from "./types";

// Funciones de utilidad
export {
  formatDate,
  formatDayOfWeek,
  normalizeTitle,
  getDifficultyColor,
  getSourceColor,
  groupProblemsByDate,
  sortProblemsByDate,
  calculateStats,
} from "./utils";
