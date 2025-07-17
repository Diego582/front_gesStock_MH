// src/pages/DashboardGeneral.jsx
import { Box, Grid, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import { BarChart3, ShoppingCart, Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const dashboardOptions = [
    {
      title: "Dashboard de Ventas",
      icon: <ShoppingCart size={48} color="#1976d2" />,
      route: "/dashboard/ventas"
    },
    {
      title: "Dashboard de Stock",
      icon: <Warehouse size={48} color="#43a047" />,
      route: "/dashboard/stock"
    },
    {
      title: "Dashboard de Compras",
      icon: <BarChart3 size={48} color="#f9a825" />,
      route: "/dashboard/compras"
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Panel General de Control
      </Typography>

      <Grid container spacing={3}>
        {dashboardOptions.map(({ title, icon, route }, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ borderRadius: 3 }}>
              <CardActionArea onClick={() => navigate(route)} sx={{ p: 3, textAlign: "center" }}>
                {icon}
                <Typography variant="h6" mt={2}>{title}</Typography>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

