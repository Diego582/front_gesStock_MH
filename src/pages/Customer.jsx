import React, { forwardRef, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  Modal,
  Divider,
  TextField,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { IMaskInput } from "react-imask";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import customer_actions from "../store/actions/customers";
import Swal from "sweetalert2";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const { read_customers, create_customer, destroy_customer } = customer_actions;

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#0-00000000-0"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useState({ lastName: "" });
  const [cliente, setCliente] = useState({
    cuit: "",
  });
  const customers = useSelector((store) => store.customers.customers);
  const conditions = [
    "Responsable Inscripto",
    "Monotributista",
    "Consumidor Final",
    "Exento",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReturn = () => {
    navigate("/remitos");
  };

  const handlePost = (cliente) => {
    dispatch(create_customer(cliente))
      .then((res) => {
        if (res.payload.customer.length > 0) {
          Swal.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
          setCliente({});
        } else if (res.payload.messages.length > 0) {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            html: res.payload.messages.map((each) => `<p>${each}<p>`),
          });
        }
      })
      .catch((err) => {});

    handleOpenCloseCreate();
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSelected = (cliente, option) => {
    setCliente(cliente);
    option === "Edit" ? handleOpenCloseEdit() : handleOpenCloseDelete();
  };

  const handleOpenCloseDelete = () => {
    setOpenDelete(!openDelete);
  };
  const handleDelete = (cliente) => {
    dispatch(destroy_customer(cliente));
    setCliente({});
    handleOpenCloseDelete();
  };

  const handleOpenCloseEdit = (cliente) => {};

  const handleOpenCloseCreate = () => {
    setOpenCreate(!openCreate);
  };
  const handelSubmit = () => {};

  useEffect(() => {
    dispatch(read_customers(search));
  }, [search]);

  return (
    <Box
      sx={{
        justifyContent: "space-between",
        m: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: 1,
          p: 1,
        }}
      >
        <Typography variant="h4">Clientes</Typography>
        <Box>
          <Tooltip title="Nuevo Cliente">
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
      <TextField
        id="filled-search"
        label="Buscar Cliente por Apellido"
        type="search"
        variant="filled"
        name="lastName"
        onKeyUp={handleFilter}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {customers &&
          customers.map((item, index) => {
            return (
              <Paper
                sx={{
                  m: 1,
                  width: 300,
                  height: 175,
                }}
                elevation={5}
                key={index}
              >
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.lastName} , {item.name}
                    </Typography>

                    <Typography gutterBottom variant="body2" component="div">
                      {item.cuit}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      {item.address}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Tooltip title="Eliminar">
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleSelected(item, "Delete")}
                      >
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Ingresar">
                      <Link to={"/comprobantes/" + item._id}>
                        <IconButton aria-label="share">
                          <DoubleArrowIcon color="info" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Paper>
            );
          })}
      </Box>

      {/* ESTE ES EL MODAL DE CREATE */}
      <Modal open={openCreate} onClose={handleOpenCloseCreate}>
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
          <ValidatorForm onSubmit={handelSubmit}>
            <Typography variant="h4" color="secondary">
              Crear nuevo Cliente
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
                  autoFocus
                  fullWidth
                  name="name"
                  label="Nombres"
                  variant="filled"
                  onChange={handleChange}
                  sx={{ mr: 0.5 }}
                />
                <TextField
                  name="lastName"
                  fullWidth
                  label="Apellidos"
                  variant="filled"
                  onChange={handleChange}
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
                  name="dni"
                  fullWidth
                  required
                  label="D.N.I."
                  variant="filled"
                  onChange={handleChange}
                  inputProps={{ maxLength: 8 }}
                  sx={{ mr: 0.5 }}
                />
                <Box sx={{ width: "100%", ml: 0.5 }}>
                  <TextValidator
                    name="cuit"
                    fullWidth
                    label="C.U.I.T"
                    variant="filled"
                    value={cliente.cuit}
                    validators={["required"]}
                    errorMessages={["Este campo es requerido"]}
                    onChange={handleChange}
                    inputProps={{ maxLength: 11 }}
                  />
                </Box>
              </Box>
              <TextField
                name="address"
                fullWidth
                label="Direccion"
                variant="filled"
                onChange={handleChange}
                sx={{ m: 0.5, p: 0.5 }}
              />

              <TextField
                select
                name="condition"
                fullWidth
                label="Condicion"
                variant="filled"
                onChange={handleChange}
                sx={{ m: 0.5, p: 0.5 }}
                defaultValue=""
                helperText="Por favor seleccione una Opcion"
              >
                {conditions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={() => handlePost(cliente)}
              >
                Guardar
              </Button>
            </Box>
          </ValidatorForm>
        </Box>
      </Modal>

      {/* ESTE ES EL MODAL DE DELETE */}
      <Modal open={openDelete} onClose={handleOpenCloseDelete}>
        <Box
          component="form"
          encType="multipart/form-data"
          method="post"
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
            Seguro que desea Eliminar este Cliente ??? No se puede revertir
          </Typography>
          <Box sx={{ width: "100%", mt: 1, pt: 1 }}>
            <TextField
              disabled
              fullWidth
              name="nombre"
              label="Nombres"
              variant="filled"
              value={cliente && cliente.name}
              onChange={handleChange}
              sx={{ m: 0.5, p: 0.5 }}
            />
            <TextField
              disabled
              name="apellido"
              fullWidth
              label="Apellidos"
              variant="filled"
              value={cliente && cliente.lastName}
              onChange={handleChange}
              sx={{ m: 0.5, p: 0.5 }}
            />
            <TextField
              disabled
              name="cuit"
              required
              fullWidth
              label="C.U.I.T"
              value={cliente && cliente.cuit}
              variant="filled"
              onChange={handleChange}
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
              sx={{ m: 0.5, p: 0.5 }}
            />
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
              NO
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(cliente)}
            >
              SI
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Customer;
