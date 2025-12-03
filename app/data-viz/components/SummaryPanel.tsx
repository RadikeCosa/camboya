/**
 * @fileoverview SummaryPanel - Panel de resumen con estadísticas globales.
 */

import { Box, Typography, Stack, Paper } from "@mui/material";

interface SummaryPanelProps {
  totalEjercicios: number;
  diasActivos: number;
  maxCount: number;
  maxDia: string;
  sourceCount: Record<string, number>;
  difficultyCount: Record<string, number>;
}

/**
 * Panel de resumen que muestra estadísticas globales sobre los ejercicios.
 * Incluye total de ejercicios, días activos, máximo en un día,
 * y distribución por fuente y dificultad.
 */
export default function SummaryPanel({
  totalEjercicios,
  diasActivos,
  maxCount,
  maxDia,
  sourceCount,
  difficultyCount,
}: SummaryPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        bgcolor: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: 1.5,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color="text.secondary"
        sx={{ mb: 1.5 }}
      >
        Resumen
      </Typography>

      {/* Métricas principales en layout responsive */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.5, sm: 3 }}
      >
        {/* Métrica: Total de ejercicios */}
        <Box>
          <Typography variant="h5" fontWeight={600} color="text.primary">
            {totalEjercicios}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total ejercicios
          </Typography>
        </Box>

        {/* Métrica: Días activos */}
        <Box>
          <Typography variant="h5" fontWeight={600} color="text.primary">
            {diasActivos}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Días activos
          </Typography>
        </Box>

        {/* Métrica: Máximo en un día */}
        <Box>
          <Typography variant="h5" fontWeight={600} color="text.primary">
            {maxCount}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Máx. en un día ({maxDia})
          </Typography>
        </Box>
      </Stack>

      {/* Sección: Distribución por fuente y dificultad */}
      <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Fuentes:{" "}
          {Object.entries(sourceCount)
            .map(([source, count]) => `${source} (${count})`)
            .join(", ")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Dificultad:{" "}
          {Object.entries(difficultyCount)
            .map(([difficulty, count]) => `${difficulty} (${count})`)
            .join(", ")}
        </Typography>
      </Box>
    </Paper>
  );
}
