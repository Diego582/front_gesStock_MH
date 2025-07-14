import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import product_actions from "../store/actions/products";
import comprobante_check_actions from "../store/actions/comprobanteCheck";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { read_products } = product_actions;
const { add_comprobante_check } = comprobante_check_actions;
export default function CrudSales() {
  const navigate = useNavigate();

  const [codigoBarras, setCodigoBarras] = useState("");
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const addComprobante = useSelector((store) => store.comprobantesCheck);

  const handleChange = (descripcion, price) => {
    const item = {
      codigoBarras: codigoBarras,
      descripcion: descripcion,
      amount: amount,
      price: parseInt(price),
    };

    dispatch(add_comprobante_check(item));
    setCodigoBarras("");
    setAmount(1);
  };
  const handleError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay producto conese codigo!",
      showCancelButton: true,
      confirmButtonText: "Cargar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/productos");
      }
    });
  };
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      dispatch(read_products({ codigoBarras: codigoBarras }))
        .then((res) => {
          console.log(res, "resuesta de la busqueda");
          if (res.payload.products.length > 0) {
            const { descripcion, prices } = res.payload.products[0];

            handleChange(descripcion, prices[0].value);
          } else {
            handleError();
          }
        })
        .catch((e) => {});
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        id="filled-search"
        label="Cantidad"
        variant="filled"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        sx={{ mr: 1, ml: 1 }}
      />
      <TextField
        id="filled-search"
        label="Codigo de Barra"
        variant="filled"
        onChange={(e) => setCodigoBarras(e.target.value)}
        value={codigoBarras}
        onKeyDown={(event) => handleEnterKey(event)}
        fullWidth
        sx={{ mr: 1, ml: 1 }}
      />
    </Box>
  );
}
