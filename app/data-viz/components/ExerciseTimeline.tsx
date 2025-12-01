/**
 * @fileoverview ExerciseTimeline - Línea de tiempo visual del progreso en ejercicios.
 *
 * Este componente muestra una línea de tiempo con todos los ejercicios de programación
 * completados, agrupados por fecha. Incluye un panel de resumen con estadísticas
 * y tarjetas individuales para cada problema.
 *
 * NOTA: Se usa "use client" porque la línea de tiempo requiere renderizado
 * consistente entre servidor y cliente para mantener los conectores visuales
 * correctamente alineados.
 */
"use client";

import { Box, Typography } from "@mui/material";
import problemsData from "../data/problems.data.json";
import { Problem } from "./types";
import { groupByDate } from "./utils";
import SummaryPanel from "./SummaryPanel";
import TimelineView from "./TimelineView";

// Tipar los datos importados del JSON
const problems: Problem[] = problemsData as Problem[];

/**
 * Componente principal que muestra la línea de tiempo de ejercicios.
 * Incluye un panel de resumen con estadísticas y una línea de tiempo
 * con los ejercicios agrupados por fecha.
 */
export default function ExerciseTimeline() {
  // Ordenar problemas por fecha (más reciente primero)
  const sortedProblems = [...problems].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Agrupar problemas por fecha
  const grouped = groupByDate(sortedProblems);
  const dates = Object.keys(grouped);

  // Calcular estadísticas de resumen
  const totalEjercicios = sortedProblems.length;
  let maxDia = "";
  let maxCount = 0;
  const sourceCount: Record<string, number> = {};
  const difficultyCount: Record<string, number> = {};

  // Encontrar el día con más ejercicios
  dates.forEach((date) => {
    if (grouped[date].length > maxCount) {
      maxCount = grouped[date].length;
      maxDia = date;
    }
  });

  // Contar ejercicios por fuente y dificultad
  sortedProblems.forEach((p) => {
    sourceCount[p.source] = (sourceCount[p.source] || 0) + 1;
    difficultyCount[p.difficulty] = (difficultyCount[p.difficulty] || 0) + 1;
  });

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      {/* Panel de resumen con estadísticas globales */}
      <SummaryPanel
        totalEjercicios={totalEjercicios}
        diasActivos={dates.length}
        maxCount={maxCount}
        maxDia={maxDia}
        sourceCount={sourceCount}
        difficultyCount={difficultyCount}
      />

      {/* Título de la sección de línea de tiempo */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        📅 Línea de Tiempo
      </Typography>

      {/* Línea de tiempo con posición a la derecha */}
      <TimelineView dates={dates} grouped={grouped} />
    </Box>
  );
}
