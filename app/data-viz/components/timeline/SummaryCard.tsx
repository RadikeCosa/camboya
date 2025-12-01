/**
 * @fileoverview Componente SummaryCard - Panel de resumen de estadísticas.
 * Muestra métricas agregadas sobre el progreso en la resolución de ejercicios.
 *
 * Este componente presenta un resumen visual atractivo con gradiente
 * y estadísticas clave sobre la actividad de programación.
 */

import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import type { ExerciseStats } from "./types";
import { getDifficultyColor } from "./utils";

/**
 * Props del componente SummaryCard.
 */
interface SummaryCardProps {
  /** Estadísticas calculadas de los ejercicios */
  stats: ExerciseStats;
}

/**
 * Panel de resumen que muestra estadísticas agregadas de los ejercicios.
 *
 * Incluye:
 * - Total de ejercicios completados
 * - Número de días activos
 * - Record de ejercicios en un solo día
 * - Distribución por fuente (LeetCode, freeCodeCamp, etc.)
 * - Distribución por dificultad (easy, medium, hard)
 *
 * Diseño:
 * - Fondo con gradiente púrpura para destacar visualmente
 * - Texto en blanco para contraste
 * - Métricas principales en tamaño grande
 *
 * @param props - Propiedades del componente
 * @returns Componente Paper de Material UI con las estadísticas
 *
 * @example
 * <SummaryCard stats={calculatedStats} />
 */
export function SummaryCard({ stats }: SummaryCardProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        // Gradiente de marca para destacar el panel
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        borderRadius: 2,
      }}
    >
      {/* Título del panel */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        📊 Resumen de Ejercicios
      </Typography>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", my: 2 }} />

      {/* Métricas principales en layout responsive */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(255,255,255,0.3)" }}
          />
        }
      >
        {/* Métrica: Total de ejercicios */}
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {stats.totalExercises}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Total ejercicios
          </Typography>
        </Box>

        {/* Métrica: Días activos */}
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {stats.activeDays}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Días activos
          </Typography>
        </Box>

        {/* Métrica: Máximo en un día */}
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {stats.maxInOneDay}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Máx. en un día ({stats.maxDayDate})
          </Typography>
        </Box>
      </Stack>

      {/* Sección: Distribución por fuente */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
          Por fuente:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.entries(stats.sourceCount).map(([source, count]) => (
            <Chip
              key={source}
              label={`${source}: ${count}`}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Sección: Distribución por dificultad */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
          Por dificultad:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.entries(stats.difficultyCount).map(([difficulty, count]) => (
            <Chip
              key={difficulty}
              label={`${difficulty}: ${count}`}
              color={getDifficultyColor(difficulty)}
              sx={{ fontWeight: 500, textTransform: "capitalize" }}
            />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
