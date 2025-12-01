import ExerciseTimeline from "./components/ExerciseTimeline";
import { Box, Container, Typography } from "@mui/material";

export default function DataVizPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
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
          Visualización de tu progreso en la resolución de problemas de
          programación
        </Typography>
        <ExerciseTimeline />
      </Box>
    </Container>
  );
}
