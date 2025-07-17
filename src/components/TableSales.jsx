import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CrudSales from "./CrudSales";
import comprobante_check_actions from "../store/actions/comprobanteCheck";

const { destroy_comprobante_check } = comprobante_check_actions;

export default function TableSales({
  openCreate,
  setOpenCreate,
  total,
  setTotal,
}) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");
  const data = useSelector((store) => store.comprobantesCheck.compsChecks);

  const handleDelete = (item) => {
    dispatch(destroy_comprobante_check(item));
  };

  const columns = [
    { field: "codigoBarras", headerName: "Código de Barras" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "price", headerName: "Precio" },
    { field: "amount", headerName: "Cantidad" },
    { field: "subtotal", headerName: "Subtotal" },
    { field: "actions", headerName: "Acciones" },
  ];

  useEffect(() => {
    if (data) {
      setTotal(data.reduce((a, b) => a + b.amount * b.price, 0));
    }
  }, [data, setTotal]);

  return (
    <>
      <CrudSales />
      <Divider sx={{ my: 2 }} />

      {data && data.length > 0 ? (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
  <TableContainer
    sx={{
      minWidth: "600px", // Fuerza scroll horizontal si la pantalla es menor
      maxHeight: "50vh",
      overflowY: "auto",
      borderRadius: 2,
      boxShadow: 1,
      mt: 2,
    }}
  >
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index} sx={{ fontWeight: "bold", p: 2 }}>
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            sx={{
              backgroundColor:
                index % 2 === 0 ? "rgba(157, 85, 82, 0.05)" : "white",
            }}
          >
            {columns.map((column, colIndex) => {
              if (column.field === "price") {
                return (
                  <TableCell key={colIndex} sx={{ p: 1 }}>
                    {"$ "}
                    {item.price?.toFixed(2)}
                  </TableCell>
                );
              }
              if (column.field === "subtotal") {
                return (
                  <TableCell key={colIndex} sx={{ p: 1 }}>
                    {"$ "}
                    {(item.price * item.amount).toFixed(2)}
                  </TableCell>
                );
              }
              if (column.field === "actions") {
                return (
                  <TableCell key={colIndex}>
                    <IconButton onClick={() => handleDelete(item)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                );
              }
              return (
                <TableCell key={colIndex} sx={{ p: 1 }}>
                  {item[column.field]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
      ) : (
        <Box
          sx={{
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f8f8f8",
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No hay productos cargados en la venta actual.
          </Typography>
        </Box>
      )}
    </>
  );
}
