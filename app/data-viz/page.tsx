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
          <span
            style={{ color: "var(--foreground-strong)", fontWeight: 500 }}
          >
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
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Visualización de tu progreso en la resolución de problemas de
          programación
        </Typography>

        {/* GitHub repository link */}
        <Box sx={{ mb: 4 }}>
          <Link
            href="https://github.com/RadikeCosa/leetCode"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--foreground-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "6px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            }}
          >
            <svg
              style={{ width: "16px", height: "16px" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Ver todos los ejercicios en GitHub
          </Link>
        </Box>

        <ExerciseTimeline />
      </Box>
    </Container>
  );
}
