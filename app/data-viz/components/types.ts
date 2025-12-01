/**
 * @fileoverview Tipos e interfaces para el módulo data-viz.
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
