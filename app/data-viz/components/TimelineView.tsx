/**
 * @fileoverview TimelineView - Vista de línea de tiempo de ejercicios.
 */

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography, Chip } from "@mui/material";
import { Problem } from "./types";
import { formatDayOfWeek } from "./utils";
import ProblemCard from "./ProblemCard";

interface TimelineViewProps {
  dates: string[];
  grouped: Record<string, Problem[]>;
}

/**
 * Componente que muestra la línea de tiempo con los ejercicios agrupados por fecha.
 */
export default function TimelineView({ dates, grouped }: TimelineViewProps) {
  return (
    <Timeline position="right">
      {dates.map((date, idx) => (
        <TimelineItem key={date}>
          {/* Contenido del lado izquierdo: información de la fecha */}
          <TimelineOppositeContent
            sx={{
              flex: { xs: "none", sm: 0.2 }, // En mobile no usa flex, en desktop 20%
              minWidth: { xs: 70, sm: 100 }, // Ancho mínimo reducido en mobile
              maxWidth: { xs: 90, sm: "none" }, // Ancho máximo en mobile para evitar overflow
              py: 2,
              px: { xs: 0.5, sm: 2 }, // Padding horizontal reducido en mobile
            }}
          >
            {/* Fecha en formato dd/mm/yy */}
            <Typography
              variant="subtitle2"
              fontWeight={600}
              color="primary.main"
              sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
            >
              {date}
            </Typography>
            {/* Día de la semana en español */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
            >
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
              sx={{
                mt: 0.5,
                display: "block",
                maxWidth: "100%",
                "& .MuiChip-label": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: { xs: "0.65rem", sm: "0.8125rem" },
                  px: { xs: 0.5, sm: 1 },
                },
              }}
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
  );
}
