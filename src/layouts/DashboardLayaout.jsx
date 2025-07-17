// layouts/DashboardLayout.jsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  useMediaQuery,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
      <List>
        {[
          { label: "General", path: "/dashboard" },
          { label: "Ventas", path: "/dashboard/ventas" },
          { label: "Stock", path: "/dashboard/stock" },
          { label: "Compras", path: "/dashboard/compras" },
        ].map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Button
              onClick={() => navigate("/")}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textTransform: "none",
              }}
            >
              M.H.
            </Button>
          </Box>
          <Typography variant="h6" noWrap>
            Panel de Control
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: "64px", // deja espacio al AppBar
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}



