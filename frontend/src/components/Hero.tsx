import { Button, Typography, Container } from "@mui/material";

export default function Hero() {
  return (
    <div style={{ padding: "4rem 0", textAlign: "center" }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a la Plataforma de Mentorías
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Conectamos estudiantes con mentores especializados para potenciar su aprendizaje.
        </Typography>

        <Button variant="contained" size="large">
          Comenzar
        </Button>
      </Container>
    </div>
  );
}
