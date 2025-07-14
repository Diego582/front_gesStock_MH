import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import product_actions from "../store/actions/products";
import prices_actions from "../store/actions/prices";

import Swal from "sweetalert2";
import { useState } from "react";
const { update_product } = product_actions;
const { update_price } = prices_actions;

export default function EditProduct({
  openEdit,
  setOpenEdit,
  product,
  setProduct,
}) {
  const dispatch = useDispatch();
  const [newPrice, setNewPrice] = useState(0);
  const handleOpenCloseEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleEdit = () => {
    let priceEdit = {
      _id: product.prices[0]._id,
      data: {
        currency: product.prices[0].currency,
        value: newPrice,
        id: product._id,
      },
    };
    dispatch(update_product(priceEdit))
      .then((res) => {
        if (res.payload.product.descripcion) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Actualización Exitosa!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.payload.messages.length > 0) {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            html: res.payload.messages.map((each) => `<p>${each}<p>`),
          });
        }
      })
      .catch((e) => {});
    handleOpenCloseEdit();
  };

  return (
    <>
      <Modal open={openEdit} onClose={handleOpenCloseEdit} sx={{ zIndex: 100 }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            height: "75%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "grid",
            alignContent: "space-around",
            justifyItems: "center",
          }}
        >
          <Typography variant="h4" color="secondary">
            Edicion de Producto, solo puede cambiar el Precio !
          </Typography>
          <Box sx={{ width: "100%", mt: 1, pt: 1 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                m: 0.5,
                p: 0.5,
              }}
            >
              <TextField
                disabled
                fullWidth
                label="Codigo de Barras"
                variant="filled"
                value={product && product.codigoBarras}
                sx={{ mr: 0.5 }}
              />
              <TextField
                disabled
                value={product && product.categoria}
                fullWidth
                label="Categoria"
                variant="filled"
                sx={{ ml: 0.5 }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                m: 0.5,
                p: 0.5,
              }}
            >
              <TextField
                disabled
                value={product && product.descripcion}
                fullWidth
                label="Descripcion"
                variant="filled"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                m: 0.5,
                p: 0.5,
              }}
            >
              <TextField
                disabled
                fullWidth
                label="Precio"
                variant="filled"
                value={product && product.prices[0].value}
                sx={{ mr: 0.5 }}
              />
              <TextField
                fullWidth
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value.replace(/,/g, "."))}
                label="Nuevo precio"
                variant="filled"
                sx={{ ml: 0.5 }}
              />
            </Box>
          </Box>

          <Divider />
          <Box
            sx={{
              width: "75%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={handleOpenCloseEdit}
              variant="contained"
              color="error"
              sx={{ mr: 0.5, ml: 0.5 }}
            >
              Cancelar
            </Button>

            <Button
              sx={{ color: "white" }}
              type="submit"
              variant="contained"
              color="info"
              onClick={() => handleEdit(product._id)}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
