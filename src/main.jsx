import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#40273d",
    },
    secondary: {
      main: "#586155",
    },
    tertiary: {
      main: "#96413E",
    },
    fourth: {
      main: "#F8F8F8",
    },
    textFielfWhite: {
      main: "#ffffff",
    },
    colorsCards: {
      main: "#3EF029",
    },
    primarySignup: {
      main: "#72733B",
    },
    secondarySignup: {
      main: "#D9B218",
    },
    error: {
      main: "#F0625D",
    },
    success: {
      main: "#5DF091",
    },
    info: {
      main: "#5DAEF0",
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