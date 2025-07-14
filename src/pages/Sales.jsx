import NavSales from "../components/NavSales";
import { Box, Typography } from "@mui/material";
import TableVentas from "../components/TableVentas";

const Sales = () => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <NavSales />
      <Box sx={{ height: "82vh" }}>
      <Typography variant="h4" color="initial">
        Reservado para ventas
      </Typography>
        {/* <TableVentas /> */}
      </Box>
    </Box>
  );
};

export default Sales;
