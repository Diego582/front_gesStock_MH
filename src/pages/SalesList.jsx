import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Download, Search } from "lucide-react";
import * as XLSX from "xlsx";
import check_actions from "../store/actions/check";
import { useDispatch, useSelector } from "react-redux";
const { read_checks } = check_actions;

const SalesList = ({ sales }) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  //const [filterClient, setFilterClient] = useState("");

  const filteredSales = useSelector((store) => store.checks.checks);

  /*   const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const clientName = `${sale.client_id.name} ${sale.client_id.lastName}`.toLowerCase();
      return clientName.includes(searchText.toLowerCase()) &&
        (filterClient ? sale.client_id._id === filterClient : true);
    });
  }, [sales, searchText, filterClient]);
*/
  const exportToExcel = () => {
    const data = filteredSales.map((sale) => ({
      Comprobante: sale.comprobante,
      Fecha: new Date(sale.fecha).toLocaleDateString(),
      Cliente: `${sale.client_id.name} ${sale.client_id.lastName}`,
      Total: sale.products_id.reduce(
        (acc, prod) => acc + prod.amount * parseFloat(prod.price),
        0
      ),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "ventas.xlsx");
  };

  useEffect(() => {
    dispatch(read_checks());
  }, []);

  return (
    <Box p={2}>
      <Card className="shadow-xl rounded-2xl">
        <CardContent>
          <Typography variant="h5" mb={2}>
            Listado de Ventas
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
            <TextField
              label="Buscar por cliente"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{ endAdornment: <Search size={18} /> }}
            />

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={exportToExcel}
            >
              Exportar a Excel
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Comprobante</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSales &&
                  filteredSales.map((sale) => (
                    <TableRow key={sale._id}>
                      <TableCell>{sale.comprobante}</TableCell>
                      <TableCell>
                        {new Date(sale.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {sale.client_id.name} {sale.client_id.lastName}
                      </TableCell>
                      <TableCell>
                        ${" "}
                        {sale.products_id
                          .reduce(
                            (acc, prod) =>
                              acc + prod.amount * parseFloat(prod.price),
                            0
                          )
                          .toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalesList;
