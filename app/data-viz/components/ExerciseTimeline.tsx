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

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Representa un problema de programación individual.
 * Contiene toda la información relevante sobre un ejercicio resuelto.
 */
interface Problem {
  /** Nombre único del problema (slug) */
  name: string;
  /** Ruta del archivo donde se encuentra la solución */
  path: string;
  /** Indica si existe una implementación de la solución */
  hasImplementation: boolean;
  /** Indica si existen tests para la solución */
  hasTests: boolean;
  /** Indica si existe una explicación del problema */
  hasExplanation: boolean;
  /** Indica si existe análisis post-solución */
  hasPostSolution: boolean;
  /** Fuente del problema (ej: "leetcode", "freecodecamp") */
  source: string;
  /** Serie a la que pertenece el problema */
  series: string;
  /** Categoría del problema */
  category: string;
  /** Nivel de dificultad del problema */
  difficulty: string;
  /** Lista de temas/tópicos relacionados */
  topics: string[];
  /** Fecha de creación en formato ISO (YYYY-MM-DD) */
  createdAt: string;
  /** Indica si el archivo tiene frontmatter válido */
  hasFrontmatter: boolean;
  /** Título legible del problema */
  title: string;
}

// Tipar los datos importados del JSON
const problems: Problem[] = problemsData as Problem[];

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Formatea una fecha ISO a formato dd/mm/yy.
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Fecha formateada como dd/mm/yy
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

/**
 * Obtiene el nombre del día de la semana en español.
 * @param dateStr - Fecha en formato ISO (YYYY-MM-DD)
 * @returns Nombre del día de la semana en español
 */
function formatDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
  });
}

/**
 * Normaliza un título reemplazando guiones por espacios
 * y capitalizando la primera letra de cada palabra.
 * @param title - Título con guiones (slug)
 * @returns Título normalizado para mostrar al usuario
 */
function normalizeTitle(title: string): string {
  return title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Obtiene el color de Material UI correspondiente a un nivel de dificultad.
 * @param difficulty - Nivel de dificultad (easy, medium, hard)
 * @returns Color de Material UI para el Chip
 */
function getDifficultyColor(
  difficulty: string
): "success" | "warning" | "error" | "default" {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "success"; // Verde - problemas fáciles
    case "medium":
      return "warning"; // Naranja - problemas intermedios
    case "hard":
      return "error"; // Rojo - problemas difíciles
    default:
      return "default";
  }
}

/**
 * Obtiene el color hexadecimal correspondiente a una fuente de problemas.
 * Cada plataforma tiene su color de marca característico.
 * @param source - Nombre de la fuente (leetcode, freecodecamp, etc.)
 * @returns Color hexadecimal
 */
function getSourceColor(source: string): string {
  switch (source.toLowerCase()) {
    case "leetcode":
      return "#FFA116"; // Naranja característico de LeetCode
    case "freecodecamp":
      return "#0A0A23"; // Azul oscuro de freeCodeCamp
    default:
      return "#666"; // Gris para otras fuentes
  }
}

/**
 * Agrupa los problemas por fecha de creación.
 * @param problemList - Array de problemas a agrupar
 * @returns Objeto con fechas como claves y arrays de problemas como valores
 */
const groupByDate = (problemList: Problem[]): Record<string, Problem[]> => {
  const map: Record<string, Problem[]> = {};
  problemList.forEach((p) => {
    const date = formatDate(p.createdAt);
    if (!map[date]) map[date] = [];
    map[date].push(p);
  });
  return map;
};

// ============================================================================
// COMPONENTES
// ============================================================================

/**
 * Tarjeta visual que muestra la información de un problema de programación.
 * Incluye título, dificultad, fuente, categoría y tópicos.
 */
function ProblemCard({ problem }: { problem: Problem }) {
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
              {dates.length}
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

      {/* Título de la sección de línea de tiempo */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        📅 Línea de Tiempo
      </Typography>

      {/* Línea de tiempo con posición a la derecha */}
      <Timeline position="right">
        {dates.map((date, idx) => (
          <TimelineItem key={date}>
            {/* Contenido del lado izquierdo: información de la fecha */}
            <TimelineOppositeContent
              sx={{
                flex: 0.2, // Ocupa 20% del ancho
                minWidth: 100, // Ancho mínimo para legibilidad
                py: 2,
              }}
            >
              {/* Fecha en formato dd/mm/yy */}
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="primary.main"
              >
                {date}
              </Typography>
              {/* Día de la semana en español */}
              <Typography variant="caption" color="text.secondary">
                {formatDayOfWeek(grouped[date][0].createdAt)}
              </Typography>
              {/* Contador de ejercicios del día */}
              <Chip
                label={`${grouped[date].length} ${
                  grouped[date].length === 1 ? "ejercicio" : "ejercicios"
                }`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mt: 0.5, display: "block", width: "fit-content" }}
              />
            </TimelineOppositeContent>

            {/* Separador central: punto y conectores */}
            <TimelineSeparator>
              {/* Conector superior (solo si no es el primer nodo) */}
              {idx > 0 && (
                <TimelineConnector sx={{ bgcolor: "primary.light" }} />
              )}
              {/* Punto central - tamaño y color según actividad del día */}
              <TimelineDot
                color={grouped[date].length >= 3 ? "secondary" : "primary"}
                sx={{
                  width: grouped[date].length >= 3 ? 16 : 12,
                  height: grouped[date].length >= 3 ? 16 : 12,
                }}
              />
              {/* Conector inferior (siempre presente para continuidad) */}
              <TimelineConnector sx={{ bgcolor: "primary.light" }} />
            </TimelineSeparator>

            {/* Contenido del lado derecho: tarjetas de problemas */}
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
