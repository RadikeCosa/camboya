/**
 * @fileoverview ProblemCard - Tarjeta visual para mostrar información de un problema.
 */

import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { Problem } from "./types";
import { normalizeTitle, getDifficultyColor, getSourceColor } from "./utils";

interface ProblemCardProps {
  problem: Problem;
}

/**
 * Tarjeta visual que muestra la información de un problema de programación.
 * Incluye título, dificultad, fuente, categoría y tópicos.
 */
export default function ProblemCard({ problem }: ProblemCardProps) {
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
        borderColor: getSourceColor(problem.source),
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
            color={getDifficultyColor(problem.difficulty)}
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
              borderColor: getSourceColor(problem.source),
              color: getSourceColor(problem.source),
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
