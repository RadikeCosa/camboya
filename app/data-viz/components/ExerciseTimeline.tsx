import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import problems from "../data/problems.data.json";
import { Box, Typography, Paper } from "@mui/material";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

function normalizeTitle(title: string) {
  return title.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Agrupar ejercicios por fecha
const groupByDate = (problems: any[]) => {
  const map: Record<string, any[]> = {};
  problems.forEach((p) => {
    const date = formatDate(p.createdAt);
    if (!map[date]) map[date] = [];
    map[date].push(p);
  });
  return map;
};

export default function ExerciseTimeline() {
  // Ordenar por fecha ascendente
  const sortedProblems = [...problems].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const grouped = groupByDate(sortedProblems);
  const dates = Object.keys(grouped);

  // Calcular resumen
  const totalEjercicios = sortedProblems.length;
  let maxDia = "";
  let maxCount = 0;
  dates.forEach((date) => {
    if (grouped[date].length > maxCount) {
      maxCount = grouped[date].length;
      maxDia = date;
    }
  });

  return (
    <Box>
      <Timeline position="right">
        {dates.map((date, idx) => (
          <TimelineItem key={date}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {idx < dates.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box display="flex" alignItems="flex-start">
                <Box minWidth={90} textAlign="left">
                  <Typography variant="subtitle2" color="textSecondary">
                    {date}
                  </Typography>
                </Box>
                <Box ml={2}>
                  {grouped[date].map((problem: any) => (
                    <Paper key={problem.name} sx={{ p: 1, mb: 0.5 }}>
                      <Typography variant="body1">
                        {normalizeTitle(problem.title)}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Box mt={3}>
        <Typography variant="h6">Resumen</Typography>
        <Typography>Total de ejercicios: {totalEjercicios}</Typography>
        <Typography>
          Día con más ejercicios: {maxDia} ({maxCount} ejercicios)
        </Typography>
      </Box>
    </Box>
  );
}
