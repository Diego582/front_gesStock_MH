import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
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
  const handleOpenCloseCreate = () => {
    setOpenCreate(!openCreate);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setSearch(product);
      console.log(search, "search");
    }
  };

  const handleReturn = () => {
    navigate("/remitos");
  };

  useEffect(() => {
    dispatch(read_products(search));
  }, [search]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        height: "90vh",
        pl: 1,
        pr: 1,
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
        <Typography variant="h4">Productos</Typography>

        <Box>
          <Tooltip title="Nuevo Producto">
            <IconButton onClick={handleOpenCloseCreate}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Volver">
            <IconButton onClick={handleReturn}>
              <KeyboardReturnIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ mt: 1, mb: 1 }}>
        <TextField
          id="filled-search"
          label="Buscar Producto por Nombre"
          type="search"
          variant="filled"
          name="descripcion"
          onChange={(e) => setProduct(e.target.value)}
          onKeyDown={(event) => handleEnterKey(event)}
          fullWidth
        />
      </Box>
      <TableProductos openCreate={openCreate} setOpenCreate={setOpenCreate} />
    </Box>
  );
};

export default Products;
