import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2C3E50",       // Azul acero: profesionalismo, fuerza
    },
    secondary: {
      main: "#E67E22",       // Naranja construcción: energía, acción
    },
    tertiary: {
      main: "#F4F4F4",       // Gris claro: fondo general
    },
    fourth: {
      main: "#EDEDED",       // Fondo alternativo: más contraste con texto
    },
    textFielfWhite: {
      main: "#FFFFFF",       // Blanco puro para campos y contraste limpio
    },
    colorsCards: {
      main: "#BDC3C7",       // Gris hormigón: neutro, para tarjetas y contenedores
    },
    primarySignup: {
      main: "#5D6D2B",       // Verde oliva oscuro: asociado a confianza y estabilidad
    },
    secondarySignup: {
      main: "#D4AC0D",       // Amarillo maquinaria: acento fuerte para formularios
    },
    error: {
      main: "#C0392B",       // Rojo ladrillo: más sobrio y acorde al rubro
    },
    success: {
      main: "#27AE60",       // Verde confianza: confirma acciones con claridad
    },
    info: {
      main: "#3498DB",       // Azul constructivo: para datos o links informativos
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);