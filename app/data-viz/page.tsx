import Link from "next/link";
import ExerciseTimeline from "./components/ExerciseTimeline";
import { Box, Container, Typography } from "@mui/material";

export default function DataVizPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Breadcrumb navigation */}
        <Box
          component="nav"
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "0.875rem",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--foreground-muted)",
              textDecoration: "none",
            }}
          >
            <svg
              style={{ width: "16px", height: "16px" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Inicio
          </Link>
          <span style={{ color: "var(--foreground-muted)" }}>/</span>
          <span style={{ color: "var(--foreground-strong)", fontWeight: 500 }}>
            Data Visualization
          </span>
        </Box>

        <Typography
          variant="h3"
          component="h1"
          fontWeight={700}
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          🚀 Progreso de Ejercicios
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Visualización de informacion sobre ejercicios de programación
          realizados.
        </Typography>
        <ExerciseTimeline />
      </Box>
    </Container>
  );
}
