/**
 * @fileoverview ProblemCard - Tarjeta visual para mostrar información de un problema.
 */

import NextLink from "next/link";
import { Box, Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { Problem } from "./types";
import { normalizeTitle } from "./utils";

interface ProblemCardProps {
  problem: Problem;
}

/**
 * Obtiene el color neutro para el badge de dificultad.
 */
function getDifficultyBadgeStyle(difficulty: string): {
  bgcolor: string;
  color: string;
} {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return { bgcolor: "#dcfce7", color: "#166534" };
    case "medium":
      return { bgcolor: "#fef3c7", color: "#92400e" };
    case "hard":
      return { bgcolor: "#fee2e2", color: "#991b1b" };
    default:
      return { bgcolor: "#f3f4f6", color: "#4b5563" };
  }
}

/**
 * Tarjeta visual que muestra la información de un problema de programación.
 * Diseño minimalista: título, dificultad y fuente.
 * Al hacer click navega a la página de detalle del problema.
 */
export default function ProblemCard({ problem }: ProblemCardProps) {
  const difficultyStyle = getDifficultyBadgeStyle(problem.difficulty);

  return (
    <Card
      elevation={0}
      sx={{
        mb: 1,
        border: "1px solid #e5e7eb",
        borderRadius: 1,
        "&:hover": {
          borderColor: "#9ca3af",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
        transition: "all 0.2s ease",
      }}
    >
      <CardActionArea
        component={NextLink}
        href={`/data-viz/${encodeURIComponent(problem.name)}`}
      >
        <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
          {/* Encabezado: Título + Badge de dificultad */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
          >
            {/* Título del problema */}
            <Typography
              variant="body2"
              fontWeight={500}
              color="text.primary"
              sx={{ flex: 1 }}
            >
              {normalizeTitle(problem.title)}
            </Typography>
            {/* Badge de dificultad simple */}
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 0.5,
                fontSize: "0.7rem",
                fontWeight: 500,
                textTransform: "capitalize",
                ...difficultyStyle,
              }}
            >
              {problem.difficulty}
            </Box>
          </Box>

          {/* Fuente como texto secundario */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 0.5, textTransform: "capitalize" }}
          >
            {problem.source}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
