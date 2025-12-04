import Link from "next/link";
import ExerciseTimeline from "./components/ExerciseTimeline";
import { Box, Container, Typography } from "@mui/material";
import { HomeIcon, GitHubIcon } from "../icons";

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
            <HomeIcon className="w-4 h-4" />
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
<<<<<<< HEAD
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Visualización de tu progreso en la resolución de problemas de programación
        </Typography>
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
            <GitHubIcon className="w-4 h-4" />
            Ver todos los ejercicios en GitHub
          </Link>
        </Box>

        <ExerciseTimeline />
      </Box>
    </Container>
  );
}
