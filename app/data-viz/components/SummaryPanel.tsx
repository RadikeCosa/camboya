/**
 * @fileoverview SummaryPanel - Panel de resumen con estadísticas globales.
 */

import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { getDifficultyColor } from "./utils";

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
            {totalEjercicios}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Total ejercicios
          </Typography>
        </Box>

        {/* Métrica: Días activos */}
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {diasActivos}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Días activos
          </Typography>
        </Box>

        {/* Métrica: Máximo en un día */}
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {maxCount}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Máx. en un día ({maxDia})
          </Typography>
        </Box>
      </Stack>

      {/* Sección: Distribución por fuente */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
          Por fuente:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.entries(sourceCount).map(([source, count]) => (
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
          {Object.entries(difficultyCount).map(([difficulty, count]) => (
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
