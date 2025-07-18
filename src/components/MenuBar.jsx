import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import StoreIcon from "@mui/icons-material/Store";
import GroupIcon from "@mui/icons-material/Group";
import FeedIcon from "@mui/icons-material/Feed";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

export default function MenuBar({ onClose }) {
  const categories = [
    "Ventas",
    "Compras",
    "Clientes",
    "Productos",
    "Reportes",
    "Dashboard",
  ];

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        height: "100vh",
        width: { xs: "200px", sm: "60px", md: "5vw" },
        minWidth: { sm: "60px", md: "70px" },
        overflow: "hidden",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        {categories.map((text, index) => (
          <ListItem key={index} disablePadding onClick={onClose}>
            <Link to={text.toLowerCase()} style={{ textDecoration: "none" }}>
              <ListItemButton>
                <Tooltip title={text}>
                  <ListItemIcon sx={{ pt: 2, pb: 2 }}>
                    {text === "Ventas" ? (
                      <ShoppingCartCheckoutIcon sx={{ color: "white" }} />
                    ) : text === "Compras" ? (
                      <StoreIcon sx={{ color: "white" }} />
                    ) : text === "Productos" ? (
                      <WidgetsIcon sx={{ color: "white" }} />
                    ) : text === "Clientes" ? (
                      <GroupIcon sx={{ color: "white" }} />
                    ) : text === "Reportes" ? (
                      <FeedIcon sx={{ color: "white" }} />
                    ) : (
                      <DashboardIcon sx={{ color: "white" }} />
                    )}
                  </ListItemIcon>
                </Tooltip>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem onClick={onClose}>
          <ListItemIcon sx={{ pt: 2, pb: 2 }}>
            <Tooltip title="Salir">
              <ExitToAppIcon sx={{ color: "white" }} />
            </Tooltip>
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  );
}
