// pages/Products.jsx
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TableProductos from "../components/TableProductos";
import { useEffect, useState } from "react";
import products_actions from "../store/actions/products";
import { useDispatch } from "react-redux";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const { read_products } = products_actions;

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCreate, setOpenCreate] = useState(false);
  const [search, setSearch] = useState({ descripcion: "" });
  const [product, setProduct] = useState("");

  const handleOpenCloseCreate = () => setOpenCreate(!openCreate);
  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearch({ descripcion: product });
    }
  };
  const handleReturn = () => navigate("/remitos");

  useEffect(() => {
    dispatch(read_products(search));
  }, [search]);

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: 2,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Productos
        </Typography>
        <Box>
          <Tooltip title="Nuevo Producto">
            <IconButton onClick={handleOpenCloseCreate}>
              <AddCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Volver">
            <IconButton onClick={handleReturn}>
              <KeyboardReturnIcon fontSize="large" color="secondary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TextField
        variant="filled"
        label="Buscar producto por nombre"
        fullWidth
        onChange={(e) => setProduct(e.target.value)}
        onKeyDown={handleEnterKey}
        sx={{ mb: 2 }}
      />

      <TableProductos
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
      />
    </Box>
  );
};

export default Products;
