/**
 * @fileoverview Re-exportación del componente ExerciseTimeline.
 *
 * Este archivo mantiene la compatibilidad con las importaciones existentes
 * mientras que la implementación real está modularizada en el directorio timeline/.
 *
 * El componente ExerciseTimeline es ahora un Server Component que no requiere
 * la directiva "use client", ya que toda la lógica de fechas utiliza UTC
 * para garantizar consistencia entre servidor y cliente.
 *
 * Estructura del módulo timeline/:
 * - types.ts: Interfaces y tipos TypeScript
 * - utils.ts: Funciones de utilidad (formateo, cálculos)
 * - ProblemCard.tsx: Tarjeta individual de problema
 * - SummaryCard.tsx: Panel de estadísticas
 * - TimelineNode.tsx: Nodo de la línea de tiempo
 * - ExerciseTimeline.tsx: Componente principal
 * - index.ts: Barrel exports
 */

// Re-exportar el componente principal como export default para mantener compatibilidad
export { ExerciseTimeline as default } from "./timeline";

// También exportar como named export para mayor flexibilidad
export { ExerciseTimeline } from "./timeline";

// Exportar tipos y utilidades para uso externo si es necesario
export type { Problem, ExerciseStats, GroupedProblems } from "./timeline";
export {
  formatDate,
  formatDayOfWeek,
  normalizeTitle,
  getDifficultyColor,
  getSourceColor,
  groupProblemsByDate,
  sortProblemsByDate,
  calculateStats,
} from "./timeline";
