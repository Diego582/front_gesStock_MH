import { createBrowserRouter } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard";
import DashboardVentas from "./components/dashboard/DashboardVentas";
import { DashboardStock } from "./components/dashboard/DashboardStock";
import DashboardCompras from "./components/dashboard/DashboardCompras";
import DashboardLayout from "./layouts/DashboardLayaout";
import GeneralQueries from "./pages/GeneralQueries";
import ProductValueQuery from "./pages/ProductValueQuery";
import SalesList from "./pages/SalesList";

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
      { path: "/consultas", element: <GeneralQueries /> },
      {
        path: "/productos",
        element: <Products />,
      },
      {
        path: "/buscarprecio",
        element: <ProductValueQuery />,
      },
      {
        path: "/listadoventas",
        element: <SalesList />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> }, // /dashboard
          { path: "ventas", element: <DashboardVentas /> }, // /dashboard/ventas
          { path: "stock", element: <DashboardStock /> }, // /dashboard/stock
          { path: "compras", element: <DashboardCompras /> }, // /dashboard/compras
        ],
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
