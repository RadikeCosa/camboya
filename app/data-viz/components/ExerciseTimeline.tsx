import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import problemsData from "../data/problems.data.json";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Card,
  CardContent,
  Divider,
  Paper,
} from "@mui/material";

// Types
interface Problem {
  name: string;
  path: string;
  hasImplementation: boolean;
  hasTests: boolean;
  hasExplanation: boolean;
  hasPostSolution: boolean;
  source: string;
  series: string;
  category: string;
  difficulty: string;
  topics: string[];
  createdAt: string;
  hasFrontmatter: boolean;
  title: string;
}

// Type the imported JSON data
const problems: Problem[] = problemsData as Problem[];

// Helper functions
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

function formatDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
  });
}

function normalizeTitle(title: string): string {
  return title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getDifficultyColor(
  difficulty: string
): "success" | "warning" | "error" | "default" {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "default";
  }
}

function getSourceColor(source: string): string {
  switch (source.toLowerCase()) {
    case "leetcode":
      return "#FFA116";
    case "freecodecamp":
      return "#0A0A23";
    default:
      return "#666";
  }
}

// Group exercises by date
const groupByDate = (problemList: Problem[]): Record<string, Problem[]> => {
  const map: Record<string, Problem[]> = {};
  problemList.forEach((p) => {
    const date = formatDate(p.createdAt);
    if (!map[date]) map[date] = [];
    map[date].push(p);
  });
  return map;
};

// Problem Card Component
function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Card
      elevation={2}
      sx={{
        mb: 1.5,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          elevation: 4,
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
        borderLeft: 4,
        borderColor: getSourceColor(problem.source),
      }}
    >
      <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
            {normalizeTitle(problem.title)}
          </Typography>
          <Chip
            label={problem.difficulty}
            size="small"
            color={getDifficultyColor(problem.difficulty)}
            sx={{ fontWeight: 500, textTransform: "capitalize" }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mt: 1, mb: 1 }}
        >
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
          <Typography variant="caption" color="text.secondary">
            {problem.series} • {problem.category}
          </Typography>
        </Stack>

        {problem.topics.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
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

export default function ExerciseTimeline() {
  // Sort by date ascending
  const sortedProblems = [...problems].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const grouped = groupByDate(sortedProblems);
  const dates = Object.keys(grouped);

  // Calculate summary statistics
  const totalEjercicios = sortedProblems.length;
  let maxDia = "";
  let maxCount = 0;
  const sourceCount: Record<string, number> = {};
  const difficultyCount: Record<string, number> = {};

  dates.forEach((date) => {
    if (grouped[date].length > maxCount) {
      maxCount = grouped[date].length;
      maxDia = date;
    }
  });

  sortedProblems.forEach((p) => {
    sourceCount[p.source] = (sourceCount[p.source] || 0) + 1;
    difficultyCount[p.difficulty] = (difficultyCount[p.difficulty] || 0) + 1;
  });

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      {/* Summary Card */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          📊 Resumen de Ejercicios
        </Typography>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", my: 2 }} />

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
          <Box>
            <Typography variant="h3" fontWeight={700}>
              {totalEjercicios}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total ejercicios
            </Typography>
          </Box>

          <Box>
            <Typography variant="h3" fontWeight={700}>
              {dates.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Días activos
            </Typography>
          </Box>

          <Box>
            <Typography variant="h3" fontWeight={700}>
              {maxCount}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Máx. en un día ({maxDia})
            </Typography>
          </Box>
        </Stack>

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

      {/* Timeline */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        📅 Línea de Tiempo
      </Typography>

      <Timeline position="right">
        {dates.map((date, idx) => (
          <TimelineItem key={date}>
            <TimelineOppositeContent
              sx={{
                flex: 0.2,
                minWidth: 100,
                py: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="primary.main"
              >
                {date}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDayOfWeek(grouped[date][0].createdAt)}
              </Typography>
              <Chip
                label={`${grouped[date].length} ${grouped[date].length === 1 ? "ejercicio" : "ejercicios"}`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mt: 0.5, display: "block", width: "fit-content" }}
              />
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                color={grouped[date].length >= 3 ? "secondary" : "primary"}
                sx={{
                  width: grouped[date].length >= 3 ? 16 : 12,
                  height: grouped[date].length >= 3 ? 16 : 12,
                }}
              />
              {idx < dates.length - 1 && (
                <TimelineConnector sx={{ bgcolor: "primary.light" }} />
              )}
            </TimelineSeparator>

            <TimelineContent sx={{ py: 2, px: 2 }}>
              {grouped[date].map((problem) => (
                <ProblemCard key={problem.name} problem={problem} />
              ))}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
