import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import product_actions from "../store/actions/products";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateGrouping from "./CreateGrouping";
import grouping_actions from "../store/actions/groupings";
import productBase_actions from "../store/actions/productBase";
import price_actions from "../store/actions/prices";
import Swal from "sweetalert2";

const { read_product, read_products, create_product } = product_actions;
const { read_groupings } = grouping_actions;
const { read_products_base, create_product_base } = productBase_actions;
const { create_price, destroy_price } = price_actions;

export default function CreateProduct({ openCreate, setOpenCreate }) {
  const dispatch = useDispatch();
  const productSearch = useSelector((store) => store.products.product);
  const currencies = useSelector((store) => store.groupings.groupings);
  const productBase = useSelector((store) => store.productBase.productBase);
  const barcodeRef = useRef(null);
  const [openCreateAgru, setOpenCreateAgru] = useState(false);

  const [product, setProduct] = useState({
    agrupamiento: "",
    codigoBarras: "",
    categoria: "",
    descripcion: "",
    price: "",
  });

  const [codigoBarras, setCodigoBarras] = useState("");
  const [barcode, setBarcode] = useState("");
  const [agrupamiento, setAgrupamiento] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [price, setPrice] = useState(0);
  const [editing, setEditing] = useState(true);

  const handleChange = (event) => {
    setCodigoBarras(event.target.value);
  };

  const handleOpenCloseCreate = () => {
    setOpenCreate(!openCreate);
  };

  const handleOpenCloseCreateAgru = () => {
    setOpenCreateAgru(!openCreateAgru);
  };

  const handlePostPrice = () => {};

  const handleBlur = () => {
    setBarcode(codigoBarras);
  };
  const handleFocus = () => {
    setEditing(true);
  };
  const handlePost = () => {
    let productPost = {
      codigoBarras: codigoBarras,
      descripcion: descripcion,
      categoria: categoria,
      agrupamiento: agrupamiento,
    };
    let priceItem = {
      value: price > 0 ? price : 0,
      currency: "Pesos",
    };

    dispatch(create_price(priceItem))
      .then((res) => {
        productPost.prices = res.payload.price;
        dispatch(create_product(productPost))
          .then((res) => {
            if (res.payload.product) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Carga Exitosa!",
                showConfirmButton: false,
                timer: 1500,
              });

              setCodigoBarras("");
              setPrice(0);
              setBarcode("");
            } else if (res.payload.messages.length > 0) {
              dispatch(destroy_price(productPost.prices));
              Swal.fire({
                title: "Something went wrong!",
                icon: "error",
                html: res.payload.messages.map((each) => `<p>${each}<p>`),
              });
            }
          })
          .catch((err) => {});
        barcodeRef.current.select();
      })
      .catch((err) => {});
  };

  const handlePostNew = () => {
    let productPostNew = {
      codigoBarras: codigoBarras,
      descripcion: descripcion,
      categoria: categoria,
      agrupamiento: agrupamiento,
    };

    dispatch(create_product_base(productPostNew))
      .then((res) => {
        if (res.payload.productBase.descripcion) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Carga Exitosa a BBDD!",
            showConfirmButton: false,
            timer: 1500,
          });
          handlePost();
        } else if (res.payload.messages.length > 0) {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            html: res.payload.messages.map((each) => `<p>${each}<p>`),
          });
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(read_groupings());
    dispatch(read_products_base(barcode))
      .then((res) => {
        if (res.payload.productBase) {
          setCategoria(res.payload.productBase.categoria);
          setDescripcion(res.payload.productBase.descripcion);
        } else {
          setCategoria("");
          setDescripcion("");
        }
      })
      .catch((e) => {});
  }, [barcode]);

  return (
    <>
      <Modal
        open={openCreate}
        onClose={handleOpenCloseCreate}
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
            Crear nuevo Producto
          </Typography>
          <Box sx={{ width: "100%", mt: 1, pt: 1 }}>
            <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
              <TextField
                autoFocus
                required
                fullWidth
                value={agrupamiento}
                select
                label="Agrupamiento"
                variant="filled"
                onChange={(e) => setAgrupamiento(e.target.value)}
                defaultValue=""
                sx={{ m: 0.5, p: 0.5 }}
              >
                {currencies.map((option) => (
                  <MenuItem key={option._id} value={option.descripcion}>
                    {option.descripcion}
                  </MenuItem>
                ))}
              </TextField>
              <IconButton onClick={handleOpenCloseCreateAgru}>
                <AddCircleIcon fontSize="large" color="secondary" />
              </IconButton>
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
                inputRef={barcodeRef}
                fullWidth
                required
                value={codigoBarras}
                label="Codigo de Barras"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                disabled={!editing}
                inputProps={{ maxLength: 13 }}
                sx={{ mr: 0.5 }}
              />
              <TextField
                value={price}
                focused
                onChange={(e) => setPrice(e.target.value.replace(/,/g, "."))}
                fullWidth
                required
                label="Precio"
                variant="filled"
                sx={{ ml: 0.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  inputMode: "numeric",
                }}
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
              {productBase ? (
                <TextField
                  disabled
                  value={categoria}
                  fullWidth
                  required
                  label="Categoria"
                  variant="filled"
                  inputProps={{ maxLength: 8 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <TextField
                  name="categoria"
                  value={categoria}
                  focused
                  onChange={(e) => setCategoria(e.target.value)}
                  fullWidth
                  required
                  label="Categoria"
                  variant="filled"
                  inputProps={{ maxLength: 8 }}
                />
              )}
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
              {productBase ? (
                <TextField
                  disabled
                  value={descripcion}
                  fullWidth
                  required
                  label="Descripcion"
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <TextField
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  fullWidth
                  focused
                  required
                  label="Descripcion"
                  variant="filled"
                />
              )}
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
              onClick={handleOpenCloseCreate}
              variant="contained"
              color="error"
              sx={{ mr: 0.5, ml: 0.5 }}
            >
              Cancelar
            </Button>
            {productBase ? (
              <Button
                sx={{ color: "white" }}
                type="submit"
                variant="contained"
                color="info"
                onClick={() => handlePost(codigoBarras)}
              >
                Verificar
              </Button>
            ) : (
              <Button
                sx={{ color: "white" }}
                type="submit"
                variant="contained"
                color="success"
                onClick={() => handlePostNew(codigoBarras)}
              >
                Cargar
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      <CreateGrouping
        openCreateAgru={openCreateAgru}
        setOpenCreateAgru={handleOpenCloseCreateAgru}
      />
    </>
  );
}
