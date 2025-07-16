import { Typography, Stack } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

const Shopping = () => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
        bgcolor: "tertiary.main",
        p: 3,
        color: "primary.main",
        textAlign: "center",
      }}
    >
      <StorefrontIcon sx={{ fontSize: 60, color: "primary.main" }} />
      <Typography variant="h4" fontWeight={500} color="primary.main">
        Reservado para compras
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={400}>
        Aquí podrás gestionar todas las operaciones relacionadas con las compras de materiales.
      </Typography>
    </Stack>
  );
};

export default Shopping;