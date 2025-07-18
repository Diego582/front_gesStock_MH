import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import check_actions from "../store/actions/check";
import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";

const { read_check } = check_actions;

const PrintTicket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const check = useSelector((store) => store.checks.check);

  useEffect(() => {
    dispatch(read_check({ _id: id }));
  }, [dispatch, id]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(Number(value));

  const formatDate = (fecha) =>
    new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(fecha));

  return (
    <Box
      sx={{
        width: "300px",
        margin: "0 auto",
        fontFamily: "monospace",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: 1,
      }}
    >
      {check?.comprobante ? (
        <>
          {/* Encabezado */}
          <Box textAlign="center" mb={1}>
            <Typography variant="h6" fontWeight="bold">
              Miguel Herold
            </Typography>
            <Typography variant="subtitle2">Comprobante NO FISCAL</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Info general */}
          <Box sx={{ textAlign: "left", mb: 1 }}>
            <Typography variant="body2">
              <strong>Fecha:</strong> {formatDate(check.fecha)}
            </Typography>
            <Typography variant="body2">
              <strong>Comprobante Nº:</strong> {check.comprobante}
            </Typography>
          </Box>

          {/* Cliente */}
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" fontWeight="bold">
            Cliente
          </Typography>
          <Typography variant="body2">
            {check.client_id?.name} {check.client_id?.lastName}
          </Typography>
          <Typography variant="body2">
            <strong>DNI:</strong> {check.client_id?.dni}
          </Typography>

          {/* Detalle de productos */}
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            Detalle de productos
          </Typography>

          {check.products_id?.map((item) => {
            const amount = Number(item.amount) ?? 0;
            const price = Number(item.price) ?? 0;
            const description = item.id_product?.descripcion ?? "Producto";
            const total = price * amount;

            return (
              <Box key={item._id} sx={{ mb: 1 }}>
                <Typography variant="body2" noWrap>
                  {description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                  }}
                >
                  <span>
                    {amount} x {formatCurrency(price)}
                  </span>
                  <span>{formatCurrency(total)}</span>
                </Box>
              </Box>
            );
          })}

          {/* Total final */}
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              mb: 2,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatCurrency(
                check.products_id?.reduce(
                  (acc, item) => acc + Number(item.amount ?? 0) * Number(item.price ?? 0),
                  0
                )
              )}
            </Typography>
          </Box>

          <Divider />
          {/* Footer */}
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" fontWeight="bold">
              ¡Gracias por su compra!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Guarde su comprobante para cambios o reclamos.
            </Typography>
          </Box>
        </>
      ) : (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Cargando comprobante o no disponible.
        </Typography>
      )}
    </Box>
  );
};

export default PrintTicket;

