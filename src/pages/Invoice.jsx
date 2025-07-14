import { Box, Typography } from "@mui/material";
import NavSales from "../components/NavSales";

const Invoice = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <NavSales />
      <Typography variant="h3" color="initial">
        esto es Facturacion
      </Typography>
    </Box>
  );
};

export default Invoice;
