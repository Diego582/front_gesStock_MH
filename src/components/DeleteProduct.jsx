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
const { destroy_product } = product_actions;
const { destroy_price } = prices_actions;

export default function DeleteProduct({
  openDelete,
  setOpenDelete,
  product,
  setProduct,
}) {
  const dispatch = useDispatch();

  const handleOpenCloseDelete = () => {
    setOpenDelete(!openDelete);
  };
  const handleDelete = () => {
    {
      product.prices.map((item) => {
        dispatch(destroy_price(item));
      });
    }

    dispatch(destroy_product(product))
      .then((res) => {
        if (res.payload.product) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto Eliminado!",
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
      .catch((err) => {});
    setProduct({});
    handleOpenCloseDelete();
  };
  return (
    <>
      <Modal
        open={openDelete}
        onClose={handleOpenCloseDelete}
        sx={{ zIndex: 100 }}
      >
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
            Eliminar Producto no se puede revertir , esta seguro ?
          </Typography>
          <Box sx={{ width: "100%", mt: 1, pt: 1 }}>
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
              <TextField
                fullWidth
                disabled
                label="Agrupamiento"
                variant="filled"
                value={product && product.agrupamiento}
                sx={{ m: 0.5, p: 0.5 }}
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
              onClick={handleOpenCloseDelete}
              variant="contained"
              color="success"
              sx={{ mr: 0.5, ml: 0.5 }}
            >
              Cancelar
            </Button>

            <Button
              sx={{ color: "white" }}
              type="submit"
              variant="contained"
              color="error"
              onClick={() => handleDelete(product._id)}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
