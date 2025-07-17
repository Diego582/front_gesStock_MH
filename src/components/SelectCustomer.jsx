import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import customer_actions from "../store/actions/customers";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const { read_customers, read_customer } = customer_actions;

export default function SelectCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState({ lastName: "" });

  const customer = useSelector((store) => store.customers.customer);
  const customers = useSelector((store) => store.customers.customers);

  const handleSelect = (id) => {
    dispatch(read_customer({ _id: id }));
  };

  const handleCliente = () => {
    navigate("/clientes");
  };

  useEffect(() => {
    dispatch(read_customers(search));
  }, [search]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 0.75,
        mb: 0.75,
        px: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography sx={{ minWidth: "100px" }} variant="h6">
        Cliente:
      </Typography>

      <TextField
        sx={{ minWidth: "200px" }}
        variant="filled"
        label="DNI / CUIT"
        select
        defaultValue=""
      >
        {customers.map((option) => (
          <MenuItem
            key={option._id}
            value={option.cuit}
            onClick={() => handleSelect(option._id)}
          >
            {option.lastName}, {option.name}
          </MenuItem>
        ))}
      </TextField>

      {customer && (
        <Typography
          sx={{
            flexGrow: 1,
            minWidth: "250px",
            fontSize: "1rem",
            textAlign: "left",
          }}
        >
          {customer.name} {customer.lastName} - DNI: {customer.dni}
        </Typography>
      )}

      <Tooltip title="Agregar Cliente">
        <IconButton
          onClick={handleCliente}
          color="primary"
          sx={{
            backgroundColor: "#f5f5f5",
            boxShadow: 1,
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
