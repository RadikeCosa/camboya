/**
 * @fileoverview Componente TimelineNode - Nodo individual de la línea de tiempo.
 * Representa un día específico con todos los ejercicios completados en esa fecha.
 *
 * Utiliza componentes de Material UI Lab para crear una línea de tiempo visual
 * con puntos conectados y contenido asociado.
 */

import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Typography, Chip } from "@mui/material";
import type { Problem } from "./types";
import { formatDayOfWeek } from "./utils";
import { ProblemCard } from "./ProblemCard";

/**
 * Props del componente TimelineNode.
 */
interface TimelineNodeProps {
  /** Fecha formateada para mostrar (dd/mm/yy) */
  date: string;
  /** Array de problemas completados en esta fecha */
  problems: Problem[];
  /** Indica si es el primer nodo de la línea de tiempo */
  isFirst: boolean;
}

/**
 * Nodo individual de la línea de tiempo que representa un día de actividad.
 *
 * Estructura:
 * - Lado izquierdo (TimelineOppositeContent): fecha, día de la semana, contador
 * - Centro (TimelineSeparator): punto de conexión y líneas conectoras
 * - Lado derecho (TimelineContent): tarjetas de los problemas del día
 *
 * Características visuales:
 * - El punto es más grande si hay 3+ ejercicios ese día
 * - Color secundario (púrpura) para días con alta actividad
 * - Color primario (azul) para días normales
 * - Conectores que unen todos los nodos de la línea de tiempo
 *
 * @param props - Propiedades del componente
 * @returns Componente TimelineItem de Material UI Lab
 *
 * @example
 * <TimelineNode
 *   date="15/01/25"
 *   problems={problemsForThisDay}
 *   isFirst={false}
 * />
 */
export function TimelineNode({ date, problems, isFirst }: TimelineNodeProps) {
  // Determinar si es un día de alta actividad (3+ ejercicios)
  const isHighActivity = problems.length >= 3;

  // Obtener la fecha original para calcular el día de la semana
  // Usamos el primer problema del grupo para obtener la fecha
  const originalDate = problems[0].createdAt;

  return (
    <TimelineItem>
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
          {formatDayOfWeek(originalDate)}
        </Typography>

        {/* Contador de ejercicios del día */}
        <Chip
          label={`${problems.length} ${
            problems.length === 1 ? "ejercicio" : "ejercicios"
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
        {!isFirst && (
          <TimelineConnector sx={{ bgcolor: "primary.light" }} />
        )}

        {/* Punto central - tamaño y color según actividad */}
        <TimelineDot
          color={isHighActivity ? "secondary" : "primary"}
          sx={{
            // Punto más grande para días con 3+ ejercicios
            width: isHighActivity ? 16 : 12,
            height: isHighActivity ? 16 : 12,
          }}
        />

        {/* Conector inferior (siempre presente para continuidad) */}
        <TimelineConnector sx={{ bgcolor: "primary.light" }} />
      </TimelineSeparator>

      {/* Contenido del lado derecho: tarjetas de problemas */}
      <TimelineContent sx={{ py: 2, px: 2 }}>
        {problems.map((problem) => (
          <ProblemCard key={problem.name} problem={problem} />
        ))}
      </TimelineContent>
    </TimelineItem>
  );
}
