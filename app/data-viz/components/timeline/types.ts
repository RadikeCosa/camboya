/**
 * @fileoverview Tipos e interfaces para el componente de línea de tiempo de ejercicios.
 * Estos tipos definen la estructura de datos utilizada en todo el módulo de visualización.
 */

/**
 * Representa un problema de programación individual.
 * Contiene toda la información relevante sobre un ejercicio resuelto.
 */
export interface Problem {
  /** Nombre único del problema (slug) */
  name: string;
  /** Ruta del archivo donde se encuentra la solución */
  path: string;
  /** Indica si existe una implementación de la solución */
  hasImplementation: boolean;
  /** Indica si existen tests para la solución */
  hasTests: boolean;
  /** Indica si existe una explicación del problema */
  hasExplanation: boolean;
  /** Indica si existe análisis post-solución */
  hasPostSolution: boolean;
  /** Fuente del problema (ej: "leetcode", "freecodecamp") */
  source: string;
  /** Serie a la que pertenece el problema */
  series: string;
  /** Categoría del problema */
  category: string;
  /** Nivel de dificultad del problema */
  difficulty: string;
  /** Lista de temas/tópicos relacionados */
  topics: string[];
  /** Fecha de creación en formato ISO (YYYY-MM-DD) */
  createdAt: string;
  /** Indica si el archivo tiene frontmatter válido */
  hasFrontmatter: boolean;
  /** Título legible del problema */
  title: string;
}

/**
 * Estadísticas resumidas de todos los ejercicios.
 * Utilizado para mostrar métricas en el panel de resumen.
 */
export interface ExerciseStats {
  /** Número total de ejercicios completados */
  totalExercises: number;
  /** Número de días con actividad */
  activeDays: number;
  /** Máximo número de ejercicios en un solo día */
  maxInOneDay: number;
  /** Fecha con el máximo de ejercicios */
  maxDayDate: string;
  /** Conteo de ejercicios por fuente */
  sourceCount: Record<string, number>;
  /** Conteo de ejercicios por dificultad */
  difficultyCount: Record<string, number>;
}

/**
 * Problemas agrupados por fecha.
 * La clave es la fecha formateada y el valor es el array de problemas de ese día.
 */
export type GroupedProblems = Record<string, Problem[]>;
