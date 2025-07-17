import React, { forwardRef, useEffect, useState } from "react";
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
  Grid,
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

  // Manejo cambios en inputs
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

  // Enviar creación
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
            title: "Algo salió mal!",
            icon: "error",
            html: res.payload.messages.map((each) => `<p>${each}</p>`),
          });
        }
      })
      .catch(() => {});
    handleOpenCloseCreate();
  };

  // Filtro de clientes
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  // Selección cliente para borrar
  const handleSelected = (cliente, option) => {
    setCliente(cliente);
    option === "Delete" ? handleOpenCloseDelete() : handleOpenCloseEdit(); // La edición no implementada
  };

  const handleOpenCloseDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleDelete = (cliente) => {
    dispatch(destroy_customer(cliente));
    setCliente({});
    handleOpenCloseDelete();
  };

  // Edición placeholder
  const handleOpenCloseEdit = () => {};

  const handleOpenCloseCreate = () => {
    setOpenCreate(!openCreate);
  };

  const handelSubmit = () => {};

  // Carga inicial / búsqueda
  useEffect(() => {
    dispatch(read_customers(search));
  }, [search, dispatch]);

  return (
    <Box
      sx={{
        m: 2,
        width: "100%",
        pr: { xs: 2, sm: 4, md: 6 },
        boxSizing: "border-box",
      }}
    >
      {/* Header con título y botones */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: 2,
          p: 1,
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Clientes
        </Typography>
        <Box>
          <Tooltip title="Nuevo Cliente">
            <IconButton onClick={handleOpenCloseCreate} color="primary">
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Volver">
            <IconButton onClick={handleReturn} color="secondary">
              <KeyboardReturnIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Campo de búsqueda */}
      <TextField
        id="filled-search"
        label="Buscar Cliente por Apellido"
        type="search"
        variant="filled"
        name="lastName"
        onChange={handleFilter}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Lista de clientes */}
      <Grid container spacing={2}>
        {customers &&
          customers.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={5}
                sx={{
                  height: 180,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 2,
                  }}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {item.lastName}, {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      CUIT: {item.cuit}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Dirección: {item.address}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "space-around", pt: 0 }}>
                    <Tooltip title="Eliminar">
                      <IconButton
                        onClick={() => handleSelected(item, "Delete")}
                        color="error"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Ingresar">
                      <Link to={"/comprobantes/" + item._id}>
                        <IconButton color="info">
                          <DoubleArrowIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
      </Grid>

      {/* Modal CREAR */}
      <Modal
        open={openCreate}
        onClose={handleOpenCloseCreate}
        aria-labelledby="modal-crear-cliente"
        aria-describedby="modal-crear-cliente-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <ValidatorForm onSubmit={handelSubmit}>
            <Typography variant="h4" color="secondary" gutterBottom>
              Crear nuevo Cliente
            </Typography>
            <Box sx={{ width: "100%", mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    fullWidth
                    name="name"
                    label="Nombres"
                    variant="filled"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    fullWidth
                    label="Apellidos"
                    variant="filled"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="dni"
                    fullWidth
                    required
                    label="D.N.I."
                    variant="filled"
                    onChange={handleChange}
                    inputProps={{ maxLength: 8 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    fullWidth
                    label="Dirección"
                    variant="filled"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    name="condition"
                    fullWidth
                    label="Condición"
                    variant="filled"
                    onChange={handleChange}
                    defaultValue=""
                    helperText="Por favor seleccione una opción"
                  >
                    {conditions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                onClick={handleOpenCloseCreate}
                variant="contained"
                color="error"
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

      {/* Modal ELIMINAR */}
      <Modal
        open={openDelete}
        onClose={handleOpenCloseDelete}
        aria-labelledby="modal-eliminar-cliente"
        aria-describedby="modal-eliminar-cliente-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            maxHeight: "80vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" color="secondary" gutterBottom>
            ¿Seguro que desea eliminar este Cliente? No se puede revertir.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              disabled
              fullWidth
              name="nombre"
              label="Nombres"
              variant="filled"
              value={cliente && cliente.name}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled
              fullWidth
              name="apellido"
              label="Apellidos"
              variant="filled"
              value={cliente && cliente.lastName}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled
              fullWidth
              name="cuit"
              label="C.U.I.T"
              value={cliente && cliente.cuit}
              variant="filled"
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              onClick={handleOpenCloseDelete}
              variant="contained"
              color="success"
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
