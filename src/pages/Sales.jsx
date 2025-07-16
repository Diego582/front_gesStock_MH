import NavSales from "../components/NavSales";
import { Box, Typography, Stack } from "@mui/material";
import TableVentas from "../components/TableVentas";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Sales = () => {
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
        }}
      >
        {/* <TableVentas /> */}
        <Stack spacing={2} alignItems="center">
          <ShoppingCartIcon sx={{ fontSize: 60, color: "primary.main" }} />
          <Typography variant="h4" color="primary.main" fontWeight={500}>
            Sección de Ventas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aquí se mostrarán tus operaciones comerciales.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sales;
