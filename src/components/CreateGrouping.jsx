import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import grouping_actions from "../store/actions/groupings";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const { create_grouping } = grouping_actions;

export default function CreateGrouping({ openCreateAgru, setOpenCreateAgru }) {
  const dispatch = useDispatch();

  const [grouping, setGrouping] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrouping((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenCloseCreateAgru = () => {
    setOpenCreateAgru(!openCreateAgru);
  };
  const currencies = useSelector((store) => store.groupings);

  const handlePost = (grouping) => {
    dispatch(create_grouping(grouping))
      .then((res) => {
        if (res.payload.grouping.descripcion) {
          Swal.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
          setGrouping({});
        } else if (res.payload.messages.length > 0) {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            html: res.payload.messages.map((each) => `<p>${each}<p>`),
          });
        }
      })
      .catch((err) => {});

    handleOpenCloseCreateAgru();
  };

  useEffect(() => {}, []);

  return (
    <>
      <Modal open={openCreateAgru} onClose={handleOpenCloseCreateAgru}>
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
            backgroundColor: "rgba(155, 138, 112, 1)",
          }}
        >
          <Typography variant="h4" color="primary">
            Crear nuevo Agrupamiento
          </Typography>
          <Box sx={{ width: "100%" }}>
            <TextField
              autoFocus
              name="descripcion"
              fullWidth
              required
              label="Descripcion"
              variant="filled"
              inputProps={{ maxLength: 20 }}
              onChange={handleChange}
              sx={{ backgroundColor: "white", borderRadius: "10px" }}
            />
            <TextField
              fullWidth
              required
              name="contacto"
              label="Contacto"
              variant="filled"
              onChange={handleChange}
              inputProps={{ maxLength: 20 }}
              sx={{ mt: 1, backgroundColor: "white", borderRadius: "10px" }}
            />
            <TextField
              name="telefono"
              fullWidth
              required
              label="Telefono"
              variant="filled"
              onChange={handleChange}
              inputProps={{ maxLength: 10 }}
              sx={{ mt: 1, backgroundColor: "white", borderRadius: "10px" }}
            />

            <TextField
              type="email"
              name="email"
              fullWidth
              required
              label="E-mail"
              variant="filled"
              onChange={handleChange}
              sx={{ mt: 1, backgroundColor: "white", borderRadius: "10px" }}
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
              onClick={handleOpenCloseCreateAgru}
              variant="contained"
              color="error"
              sx={{ mr: 0.5, ml: 0.5 }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handlePost(grouping)}
              type="submit"
              variant="contained"
              color="success"
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
