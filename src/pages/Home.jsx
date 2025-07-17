import { Box, Typography, Grid, Paper, ButtonBase, Stack } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FeedIcon from "@mui/icons-material/Feed";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";

const sections = [
  {
    label: "Ventas",
    icon: <ShoppingCartCheckoutIcon fontSize="large" />,
    path: "/ventas",
  },
  { label: "Compras", icon: <StoreIcon fontSize="large" />, path: "/compras" },
  {
    label: "Clientes",
    icon: <GroupIcon fontSize="large" />,
    path: "/clientes",
  },
  {
    label: "Productos",
    icon: <WidgetsIcon fontSize="large" />,
    path: "/productos",
  },
  { label: "Reportes", icon: <FeedIcon fontSize="large" />, path: "/reportes" },
  {
    label: "Panel de control",
    icon: <DashboardIcon fontSize="large" />,
    path: "/dashboard",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "tertiary.main",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        Bienvenido
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 500, textAlign: "center" }}
      >
        Selecciona una sección para comenzar a gestionar tu negocio.
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: 700 }}
      >
        {sections.map(({ label, icon, path }) => (
          <Grid item key={label} xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { boxShadow: 6 },
              }}
              onClick={() => navigate(path)}
            >
              <ButtonBase sx={{ mb: 1 }}>{icon}</ButtonBase>
              <Stack alignItems="center">
                <Typography variant="h6" color="primary.main" fontWeight={600}>
                  {label}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
