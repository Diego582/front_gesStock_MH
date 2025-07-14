import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import MenuBar from "../components/MenuBar";


export default function MainLayout() {
  return (
    <Box>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <MenuBar />
        <Outlet />
      </Box>
      {/*  <Footer/> */}
    </Box>
  );
}
