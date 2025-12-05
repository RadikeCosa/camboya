import Link from "next/link";
import { notFound } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import { HomeIcon, ArrowIcon } from "../../icons";
import ProblemDetail from "../components/ProblemDetail";
import problemsData from "../data/problems.data.json";
import { Problem } from "../components/types";

// Tipar los datos importados del JSON
const problems: Problem[] = problemsData as Problem[];

interface ProblemPageProps {
  params: Promise<{
    problemName: string;
  }>;
}

/**
 * Genera los parámetros estáticos para todas las páginas de problemas.
 */
export async function generateStaticParams() {
  return problems.map((problem) => ({
    problemName: problem.name,
  }));
}

/**
 * Página de detalle de un problema específico.
 */
export default async function ProblemPage({ params }: ProblemPageProps) {
  const { problemName } = await params;
  const decodedName = decodeURIComponent(problemName);

  // Buscar el problema por nombre
  const problem = problems.find((p) => p.name === decodedName);

  if (!problem) {
    notFound();
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Breadcrumb navigation */}
        <Box
          component="nav"
          aria-label="Breadcrumb"
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
          <span style={{ color: "var(--foreground-muted)" }} aria-hidden="true">/</span>
          <Link
            href="/data-viz"
            style={{
              color: "var(--foreground-muted)",
              textDecoration: "none",
            }}
          >
            Data Visualization
          </Link>
          <span style={{ color: "var(--foreground-muted)" }} aria-hidden="true">/</span>
          <span 
            style={{ color: "var(--foreground-strong)", fontWeight: 500 }}
            aria-current="page"
          >
            {problem.title}
          </span>
        </Box>

        {/* Back link */}
        <Box sx={{ mb: 3 }}>
          <Link
            href="/data-viz"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--foreground-muted)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            <ArrowIcon className="w-4 h-4 rotate-180" />
            Volver a la línea de tiempo
          </Link>
        </Box>

        {/* Título de la página */}
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          gutterBottom
          sx={{
            mb: 3,
          }}
        >
          📋 Detalle del Problema
        </Typography>

        {/* Componente de detalle del problema */}
        <ProblemDetail problem={problem} />
      </Box>
    </Container>
  );
}
