import { Box, Typography, Stack, Button } from "@mui/material";
import NavSales from "../components/NavSales";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <NavSales />

      <Box
        sx={{
          height: "92%",
          bgcolor: "tertiary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          flexDirection: "column",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            color="primary"
            onClick={() => navigate("/ventas")}
          >
            Volver a Ventas
          </Button>
        </Stack>

        <Stack spacing={2} alignItems="center">
          <ReceiptIcon sx={{ fontSize: 60, color: "primary.main" }} />
          <Typography variant="h4" fontWeight={500} color="primary.main">
            Módulo de Facturación
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={400}>
            Aquí podrás gestionar las facturaciones de tus ventas y mantener el control de tus operaciones.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Invoice;
