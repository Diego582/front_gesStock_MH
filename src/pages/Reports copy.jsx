import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch } from "react-redux";
import products_actions from "../store/actions/products";
import Swal from "sweetalert2";

const { read_products } = products_actions;

const Reports = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [search, setSearch] = useState({ codigoBarras: "" });

  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(read_products(search))
        .then((res) => {
          if (res.payload.products) {
            Swal.fire({
              title: "Detalles del producto",
              html: res.payload.products
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
          }
        })
        .catch((e) => {});
    }
  };

  const handleOpenCloseCreate = () => {
    setOpenCreate(!openCreate);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "initial",
          width: "100%",
          height: "90vh",
          pl: 5,
          pr: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: 1,
            mb: 1,
          }}
        >
          <Typography variant="h4" component="div">
            Reportes
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          <Typography variant="h5" component="div">
            Consulta de Precios
          </Typography>
          <TextField
            id="filled-search"
            label="Carga de Código de Barras"
            type="search"
            variant="filled"
            name="codigoBarras"
            onChange={handleFilter}
            onKeyDown={(event) => handleEnterKey(event)}
            fullWidth
            sx={{ m: 1 }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Reports;
