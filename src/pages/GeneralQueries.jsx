import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HistoryIcon from "@mui/icons-material/History";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useNavigate } from "react-router-dom";

const queries = [
  {
    title: "Consulta de valor de producto",
    description: "Verifica el precio actual de un producto específico.",
    icon: <SearchIcon fontSize="large" color="primary" />,
    disabled: false,
    path:"/buscarprecio"
  },
  {
    title: "Movimientos recientes de stock",
    description: "Revisa las últimas entradas y salidas de productos.",
    icon: <TrendingUpIcon fontSize="large" />,
    disabled: true,
    path:"/movimientoprecio"
  },
  {
    title: "Historial de precios",
    description:
      "Consulta cómo han evolucionado los precios de los productos con el tiempo.",
    icon: <HistoryIcon fontSize="large" />,
    disabled: true,
    path:"/historialprecio"
  },
  {
    title: "Análisis de rentabilidad",
    description: "Analiza los márgenes de ganancia por producto.",
    icon: <CompareArrowsIcon fontSize="large" />,
    disabled: true,
    path:"/analisisprecio"
  },
];

export default function GeneralQueries() {


  const navigate = useNavigate();

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Typography variant="h4" gutterBottom>
        Consultas Generales
      </Typography>
      <Grid container spacing={3}>
        {queries.map((query, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                opacity: query.disabled ? 0.5 : 1,
                pointerEvents: query.disabled ? "none" : "auto",
                transition: "0.3s",
              }}
              elevation={3}
              onClick={() => navigate(query.path)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {query.icon}
                  <Typography variant="h6" ml={2}>
                    {query.title}
                  </Typography>
                </Box>
                <Typography variant="body2">{query.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
