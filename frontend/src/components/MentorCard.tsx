import { Card, CardContent, Typography, Button } from "@mui/material";

interface MentorCardProps {
  name: string;
  area: string;
  bio: string;
}

export default function MentorCard({ name, area, bio }: MentorCardProps) {
  return (
    <Card sx={{ borderRadius: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Área: {area}
        </Typography>

        <Typography variant="body2" paragraph>
          {bio}
        </Typography>

        <Button variant="outlined" size="small">
          Ver Perfil
        </Button>
      </CardContent>
    </Card>
  );
}
