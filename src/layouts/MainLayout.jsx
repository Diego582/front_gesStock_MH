// layouts/MainLayout.jsx
import { Box, useMediaQuery, Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import MenuBar from "../components/MenuBar";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

export default function MainLayout() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <NavBar onToggleMenu={() => setOpenDrawer(true)} />
      <Box sx={{ display: "flex", height: "90vh" }}>
        {/* Desktop */}
        {!isMobile && <MenuBar />}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <MenuBar onClose={() => setOpenDrawer(false)} />
          </Drawer>
        )}

        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
