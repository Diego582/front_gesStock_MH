import { useState } from "react";
import { Box, TextField, Typography, Paper, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import products_actions from "../store/actions/products";
import Swal from "sweetalert2";
const { read_products } = products_actions;

export default function ProductValueQuery() {
  const [barcode, setBarcode] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(read_products({ codigoBarras: barcode }))
        .then((res) => {
          const products = res.payload.products;

          if (products && products.length > 0) {
            Swal.fire({
              title: "Detalles del producto",
              html: products
                .map(
                  (each) => `
                  <div style="text-align: left; padding: 10px;">
                    <p><strong>Descripción:</strong> ${each.descripcion}</p>
                    <p><strong>Categoría:</strong> ${each.categoria}</p>
                    <p><strong>Agrupamiento:</strong> ${each.agrupamiento}</p>
                    <p><strong>Precio:</strong> $ ${
                      each.prices[0]?.value ?? "N/D"
                    }</p>
                  </div>
                `
                )
                .join(""),
              icon: "info",
              confirmButtonText: "Aceptar",
              customClass: {
                popup: "swal2-rounded swal2-shadow",
              },
            });
          } else {
            Swal.fire({
              title: "Producto no encontrado",
              text: "No se encontró ningún producto con ese código de barras.",
              icon: "warning",
              confirmButtonText: "Volver a intentar",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al buscar el producto.",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        px: 3,
        py: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Consulta de Precio
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ingresá o escaneá el código de barras del producto y presioná{" "}
          <strong>Enter</strong> para consultar el precio.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          fullWidth
          label="Código de barras"
          variant="outlined"
          value={barcode}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </Paper>
    </Box>
  );
}
