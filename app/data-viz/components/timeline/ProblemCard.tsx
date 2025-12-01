/**
 * @fileoverview Componente ProblemCard - Tarjeta individual para mostrar un problema.
 * Muestra información resumida de un ejercicio incluyendo título, dificultad, fuente y tópicos.
 *
 * Este componente es parte del módulo de línea de tiempo y está diseñado
 * para funcionar como Server Component.
 */

import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import type { Problem } from "./types";
import { normalizeTitle, getDifficultyColor, getSourceColor } from "./utils";

/**
 * Props del componente ProblemCard.
 */
interface ProblemCardProps {
  /** Datos del problema a mostrar */
  problem: Problem;
}

/**
 * Tarjeta visual que muestra la información de un problema de programación.
 *
 * Características:
 * - Muestra el título normalizado (sin guiones)
 * - Chip de dificultad con color según nivel
 * - Badge de la fuente del problema (LeetCode, freeCodeCamp, etc.)
 * - Lista de tópicos relevantes (máximo 4 visibles)
 * - Borde izquierdo con color de la fuente para identificación rápida
 *
 * @param props - Propiedades del componente
 * @returns Componente Card de Material UI con la información del problema
 *
 * @example
 * <ProblemCard problem={problemData} />
 */
export function ProblemCard({ problem }: ProblemCardProps) {
  // Obtener colores basados en la dificultad y fuente
  const difficultyColor = getDifficultyColor(problem.difficulty);
  const sourceColor = getSourceColor(problem.source);

  return (
    <Card
      elevation={2}
      sx={{
        mb: 1.5,
        // Transición suave para el efecto hover
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          elevation: 4,
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
        // Borde izquierdo coloreado según la fuente del problema
        borderLeft: 4,
        borderColor: sourceColor,
      }}
    >
      <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
        {/* Encabezado: Título + Chip de dificultad */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={1}
        >
          {/* Título del problema normalizado */}
          <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
            {normalizeTitle(problem.title)}
          </Typography>
          {/* Badge de dificultad con color según nivel */}
          <Chip
            label={problem.difficulty}
            size="small"
            color={difficultyColor}
            sx={{ fontWeight: 500, textTransform: "capitalize" }}
          />
        </Box>

        {/* Información de la fuente y categoría */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 1, mb: 1 }}
        >
          {/* Badge de la fuente (LeetCode, freeCodeCamp, etc.) */}
          <Chip
            label={problem.source}
            size="small"
            variant="outlined"
            sx={{
              borderColor: sourceColor,
              color: sourceColor,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          />
          {/* Categoría del problema */}
          <Typography variant="caption" color="text.secondary">
            {problem.category}
          </Typography>
        </Stack>

        {/* Lista de tópicos (máximo 4 visibles + indicador de más) */}
        {problem.topics.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {/* Mostrar solo los primeros 4 tópicos */}
            {problem.topics.slice(0, 4).map((topic, idx) => (
              <Chip
                key={idx}
                label={topic}
                size="small"
                variant="filled"
                sx={{
                  fontSize: "0.7rem",
                  height: 22,
                  bgcolor: "grey.100",
                  color: "grey.700",
                }}
              />
            ))}
            {/* Si hay más de 4 tópicos, mostrar indicador */}
            {problem.topics.length > 4 && (
              <Chip
                label={`+${problem.topics.length - 4}`}
                size="small"
                variant="filled"
                sx={{
                  fontSize: "0.7rem",
                  height: 22,
                  bgcolor: "grey.200",
                  color: "grey.600",
                }}
              />
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
