import { createBrowserRouter } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MainLayout from "./layouts/MainLayout";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Shopping from "./pages/Shopping";
import Customer from "./pages/Customer";
import Reports from "./pages/Reports";
import Products from "./pages/Products";
import Private from "./utils/Private";
import Check from "./pages/Check";
import Invoice from "./pages/Invoice";
import PrintTicket from "./pages/PrintTicket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ventas",
        element: <Sales />,
      },
      {
        path: "/facturaciones",
        element: <Invoice />,
      },
      {
        path: "/remitos",
        element: <Check />,
      },
      {
        path: "/compras",
        element: <Shopping />,
      },
      {
        path: "/clientes",
        element: <Customer />,
      },
      {
        path: "/reportes",
        element: <Reports />,
      },
      {
        path: "/productos",
        element: <Products />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/remitos/:id",
    element: <PrintTicket />,
  },
]);

export default router;