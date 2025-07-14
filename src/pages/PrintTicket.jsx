import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import check_actions from "../store/actions/check";
import { useParams } from "react-router-dom";
import { Box, Divider, MenuItem } from "@mui/material";

const { read_check } = check_actions;

const PrintTicket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const check = useSelector((store) => store.checks.check);
  useEffect(() => {
    dispatch(read_check({ _id: id }));
  }, []);

  return (
    <Box sx={{ width: "300px", textAlign: "center" }}>
      {check.comprobante ? (
        <>
          <Typography variant="h3" color="initial">
            Tiki Taka
          </Typography>
          <Typography variant="h6" color="initial">
            NO FISCAL
          </Typography>
          <Divider />
          <Box sx={{ display: "flex", p: 1 }}>
            <Typography variant="body1" color="initial" sx={{ pr: 1 }}>
              Fecha:
            </Typography>
            <Typography variant="body1" color="initial">
              {new Date(check.fecha).getDate()}
              {" / "}
              {new Date(check.fecha).getMonth() + 1}
              {" / "}
              {new Date(check.fecha).getFullYear()}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", p: 1 }}>
            <Typography variant="body1" color="initial" sx={{ pr: 1 }}>
              Ticket:
            </Typography>
            <Typography variant="body1" color="initial">
              {check.comprobante}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "left", p: 1 }}>
            <Typography variant="h6" color="initial">
              Cliente
            </Typography>
            <Typography variant="body1" color="initial">
              {check.client_id.name} {check.client_id.lastName}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body1" color="initial" sx={{ pr: 1 }}>
                D.N.I.:
              </Typography>
              <Typography variant="body1" color="initial">
                {check.client_id.dni}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Typography variant="h6" color="initial">
            Productos
          </Typography>
          <Divider />
          <Box>
            {check.products_id.map((option) => {
              return (
                <MenuItem
                  key={option._id}
                  value={option}
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <Box sx={{ display: "flex" }}>
                    {option.amount.toFixed(2)}
                    {"x"} {" $"}
                    {parseInt(option.price).toFixed(2)}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      {option.id_product.descripcion.slice(0, 15)}
                    </Typography>
                    {"  $"}{" "}
                    {(
                      option.amount.toFixed(2) *
                      parseInt(option.price).toFixed(2)
                    ).toFixed(2)}
                  </Box>
                </MenuItem>
              );
            })}
          </Box>
          <Divider />
          <Box sx={{ display: "flex", p: 1, justifyContent: "space-between" }}>
            <Typography variant="body1" color="initial" sx={{ pr: 1 }}>
              Suma Total:
            </Typography>
            <Typography variant="body1" color="initial">
              {"$ "}{" "}
              {check.products_id
                .reduce((a, b) => a + b.amount * b.price, 0)
                .toFixed(2)}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="body1" color="initial" sx={{ p: 1 }}>
            Gracias por Visitarnos !!!
          </Typography>
        </>
      ) : (
        <Typography variant="body1" color="initial" sx={{ p: 1 }}>
          No hay informe!
        </Typography>
      )}
    </Box>
  );
};

export default PrintTicket;
