/**
 * @fileoverview ExerciseTimeline - Componente principal de la línea de tiempo.
 *
 * Este es un Server Component que renderiza una línea de tiempo visual
 * mostrando el progreso en la resolución de ejercicios de programación.
 *
 * NOTA IMPORTANTE: Este componente NO usa "use client" ya que toda la lógica
 * de fechas se realiza usando UTC para evitar discrepancias entre servidor y cliente.
 * Las funciones de formateo de fechas en ./utils.ts están diseñadas específicamente
 * para ser determinísticas y producir el mismo resultado en ambos entornos.
 *
 * Arquitectura:
 * - ExerciseTimeline: Componente contenedor principal
 * - SummaryCard: Panel de estadísticas resumidas
 * - TimelineNode: Nodo individual por día
 * - ProblemCard: Tarjeta de problema individual
 *
 * Flujo de datos:
 * 1. Se importan los datos JSON de problemas
 * 2. Se ordenan por fecha (más reciente primero)
 * 3. Se agrupan por fecha
 * 4. Se calculan estadísticas
 * 5. Se renderizan los componentes visuales
 */

import Timeline from "@mui/lab/Timeline";
import { Box, Typography } from "@mui/material";
import type { Problem } from "./types";
import { sortProblemsByDate, groupProblemsByDate, calculateStats } from "./utils";
import { SummaryCard } from "./SummaryCard";
import { TimelineNode } from "./TimelineNode";

// Importación de datos - estos se cargan en tiempo de compilación (build time)
import problemsData from "../../data/problems.data.json";

/**
 * Componente principal que muestra la línea de tiempo de ejercicios.
 *
 * Características:
 * - Server Component: Se renderiza en el servidor para mejor SEO y performance
 * - Sin estado: No requiere hooks de React (useState, useEffect, etc.)
 * - Datos estáticos: Los problemas se cargan desde un archivo JSON
 *
 * Estructura visual:
 * - Panel de resumen con estadísticas globales
 * - Línea de tiempo vertical con nodos por cada día
 * - Cada nodo contiene las tarjetas de los ejercicios de ese día
 *
 * @returns Componente de línea de tiempo completo
 *
 * @example
 * // En una página de Next.js:
 * export default function DataVizPage() {
 *   return <ExerciseTimeline />;
 * }
 */
export function ExerciseTimeline() {
  // Tipar los datos importados del JSON
  const problems: Problem[] = problemsData as Problem[];

  // Paso 1: Ordenar problemas por fecha (más reciente primero)
  // Esto asegura que la línea de tiempo muestre el progreso cronológicamente
  const sortedProblems = sortProblemsByDate(problems);

  // Paso 2: Agrupar problemas por fecha
  // Permite mostrar todos los ejercicios de un día juntos
  const grouped = groupProblemsByDate(sortedProblems);

  // Paso 3: Obtener las fechas en orden
  const dates = Object.keys(grouped);

  // Paso 4: Calcular estadísticas para el panel de resumen
  const stats = calculateStats(sortedProblems, grouped);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      {/* Panel de resumen con estadísticas globales */}
      <SummaryCard stats={stats} />

      {/* Título de la sección de línea de tiempo */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        📅 Línea de Tiempo
      </Typography>

      {/* Línea de tiempo con posición a la derecha */}
      {/* Esto coloca las fechas a la izquierda y el contenido a la derecha */}
      <Timeline position="right">
        {dates.map((date, idx) => (
          <TimelineNode
            key={date}
            date={date}
            problems={grouped[date]}
            isFirst={idx === 0}
          />
        ))}
      </Timeline>
    </Box>
  );
}
