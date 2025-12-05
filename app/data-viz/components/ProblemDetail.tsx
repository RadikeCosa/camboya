/**
 * @fileoverview ProblemDetail - Vista detallada de un problema.
 * Muestra toda la información útil del problema.
 */

import { Box, Typography, Paper, Chip, Stack, Link } from "@mui/material";
import { ArticleIcon } from "../../icons";
import { Problem } from "./types";
import { normalizeTitle, formatDate, formatDayOfWeek } from "./utils";

interface ProblemDetailProps {
  problem: Problem;
}

/**
 * Obtiene el color para el badge de dificultad.
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
 * Componente que muestra la información detallada de un problema.
 * Incluye título, dificultad, fecha, fuente, topics, y links a blog/problema.
 */
export default function ProblemDetail({ problem }: ProblemDetailProps) {
  const difficultyStyle = getDifficultyBadgeStyle(problem.difficulty);
  const formattedDate = formatDate(problem.createdAt);
  const dayOfWeek = formatDayOfWeek(problem.createdAt);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      {/* Título y badge de dificultad */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography variant="h5" fontWeight={600} color="text.primary">
          {normalizeTitle(problem.title)}
        </Typography>
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.85rem",
            fontWeight: 500,
            textTransform: "capitalize",
            ...difficultyStyle,
          }}
        >
          {problem.difficulty}
        </Box>
      </Box>

      {/* Información básica */}
      <Stack spacing={2}>
        {/* Fecha */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            📅 Fecha
          </Typography>
          <Typography variant="body2">
            {formattedDate} ({dayOfWeek})
          </Typography>
        </Box>

        {/* Fuente y Categoría */}
        <Box display="flex" gap={4} flexWrap="wrap">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              📚 Fuente
            </Typography>
            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
              {problem.source}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              🏷️ Categoría
            </Typography>
            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
              {problem.category}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              📖 Serie
            </Typography>
            <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
              {problem.series}
            </Typography>
          </Box>
        </Box>

        {/* Topics */}
        {problem.topics && problem.topics.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              🧩 Topics
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {problem.topics.map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    height: 24,
                    borderColor: "#d1d5db",
                    color: "#4b5563",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Links section */}
        {(problem.blogLink || problem.problemLink) && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              🔗 Enlaces
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {problem.problemLink && (
                <Link
                  href={problem.problemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#2563eb",
                    "&:hover": {
                      color: "#1d4ed8",
                    },
                  }}
                >
                  🔗 Ver problema original
                </Link>
              )}
              {problem.blogLink && (
                <Link
                  href={problem.blogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#6b7280",
                    "&:hover": {
                      color: "#374151",
                    },
                  }}
                >
                  <ArticleIcon className="w-4 h-4" />
                  Ver en el blog
                </Link>
              )}
            </Stack>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
