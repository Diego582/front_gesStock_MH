import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";


export default function Reports() {
  const navigate = useNavigate();



  const reportOptions = [
    {
      title: "Reporte de Ventas",
      description: "Emití un resumen detallado de las ventas.",
      icon: <ShoppingCartIcon fontSize="large" />,
      disabled: true,
      path: "/ventas",
    },
    {
      title: "Reporte de Compras",
      description: "Revisá todas las compras realizadas.",
      icon: <StoreIcon fontSize="large" />,
      disabled: true,
      path: "/compras",
    },
    {
      title: "Reporte de Stock",
      description: "Consultá el estado actual del inventario.",
      icon: <InventoryIcon fontSize="large" />,
      disabled: true,
      path: "/stock",
    },
    {
      title: "Consultas Personalizadas",
      description: "Accedé a filtros avanzados y búsquedas.",
      icon: <SearchIcon fontSize="large" color="primary" />,
      disabled: false,
      path: "/consultas",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Reportes
      </Typography>

      <Grid container spacing={3}>
        {reportOptions.map((report, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: "100%",
                opacity: report.disabled ? 0.5 : 1,
                pointerEvents: report.disabled ? "none" : "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              elevation={3}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    color: report.disabled ? "text.disabled" : "primary.main",
                  }}
                >
                  {report.icon}
                </Box>
                <Typography
                  variant="h6"
                  color={report.disabled ? "text.disabled" : "text.primary"}
                >
                  {report.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {report.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  disabled={report.disabled}
                  onClick={() => navigate(report.path)}
                >
                  Ver más
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
