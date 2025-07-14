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
import { Link } from "react-router-dom";

export default function MenuBar() {
  const categories = ["Ventas", "Compras", "Clientes", "Productos", "Reportes"];

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        height: "90vh",
        width: "5vw",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        {categories.map((text, index) => (
          <ListItem key={index} disablePadding>
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
                    ) : (
                      <FeedIcon sx={{ color: "white" }} />
                    )}
                  </ListItemIcon>
                </Tooltip>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <List>
        <ListItem>
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
