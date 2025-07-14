import React from "react";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const pages = ["Home", "Slider", "Menu", "Promotions", "Reviews", "Abouts"];
  const navigate = useNavigate();
  const user = useSelector((store) => store.users.user);

  const handleLogout = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <Box>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "white", height: "10vh", width: "100%" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <img src="./logo.png" style={{ width: "100px" }} />
          </Box>

          {user && user.name ? (
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Tooltip title={user.name}>
                <IconButton sx={{ color: "white" }} onClick={handleLogout}>
                  <Avatar sx={{ backgroundColor: "primary.main" }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button color="primary">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
