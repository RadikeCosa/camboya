/**
 * @fileoverview ProblemCard - Tarjeta visual para mostrar información de un problema.
 */

import { Box, Typography, Card, CardContent, Link } from "@mui/material";
import { ArticleIcon } from "../../icons";
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
 * Diseño minimalista: título, dificultad, fuente y link al blog (si existe).
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
          borderColor: "#d1d5db",
        },
      }}
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

        {/* Link al artículo del blog (opcional) */}
        {problem.blogLink && (
          <Box sx={{ mt: 1 }}>
            <Link
              href={problem.blogLink}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#6b7280",
                "&:hover": {
                  color: "#374151",
                },
              }}
            >
              <ArticleIcon className="w-3 h-3" />
              Ver en el blog
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
