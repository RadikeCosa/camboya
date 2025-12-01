/**
 * @fileoverview Exportaciones públicas del módulo de componentes data-viz.
 */

// Tipos
export type { Problem } from "./types";

// Utilidades
export {
  formatDate,
  formatDayOfWeek,
  normalizeTitle,
  getDifficultyColor,
  getSourceColor,
  groupByDate,
} from "./utils";

// Componentes
export { default as ExerciseTimeline } from "./ExerciseTimeline";
export { default as ProblemCard } from "./ProblemCard";
export { default as SummaryPanel } from "./SummaryPanel";
export { default as TimelineView } from "./TimelineView";
