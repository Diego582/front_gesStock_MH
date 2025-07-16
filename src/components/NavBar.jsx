import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
// import { signout } from "../redux/actions";

export default function NavBar({ onToggleMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.users.user);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "white",
        height: "10vh",
        width: "100%",
        boxShadow: 1,
      }}
    >
      <Toolbar sx={{ px: 2, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton onClick={onToggleMenu} sx={{ color: "primary.main" }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* M.H. con Link */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            M.H.
          </Typography>
        </Box>

        {user && user.name ? (
          <Tooltip title={user.name}>
            <IconButton onClick={handleLogout}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}