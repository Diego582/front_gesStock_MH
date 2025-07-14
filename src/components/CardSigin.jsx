import {
  Card,
  Typography,
  Avatar,
  IconButton,
  CardContent,
  TextField,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import users_actions from "../store/actions/users";
import Swal from "sweetalert2";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
const { signin } = users_actions;

export default function CardSigin() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleStep = () => {
    setStep(1);
  };
  const [data, setData] = useState({
    mail: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSignin = () => {
    dispatch(signin({ data }))
      .then((res) => {
        if (res.payload.token) {
          Swal.fire({
            icon: "success",
            title: "Logged in !",
          });
          navigate("/");
        } else if (res.payload.messages.length > 0) {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            html: res.payload.messages.map((each) => `<p>${each}<p>`),
          });
        }
      })
      .catch((err) => {});
  };

  const handleEnterKey = (event, fieldName) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById(fieldName).focus();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card sx={{ width: { xs: "80vw", md: "40vw" }, height: "75vh" }}>
      {step == 0 ? (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "75%",
            gap: 2,
          }}
        >
          <Typography variant="body2">step 1 of 2</Typography>
          <Typography variant="h4" color="primary">
            Sign in
          </Typography>

          <TextField
            name="mail"
            id="email"
            label="Email"
            type="email"
            variant="standard"
            color="secondary"
            onChange={handleChange}
            onKeyDown={(event) => handleEnterKey(event, "button-card1")}
          />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              id="button-card1"
              onClick={handleStep}
              color="secondary"
              sx={{ width: { xs: "100%", md: "25%" } }}
              variant="contained"
            >
              Continue
            </Button>
          </Box>
          <Divider />
          <Box>
            <Link to="/">
              <Button
                startIcon={<KeyboardReturnIcon />}
                variant="contained"
                sx={{ color: "white" }}
              >
                Return to home
              </Button>
            </Link>
          </Box>
        </CardContent>
      ) : (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "75%",
            gap: 2,
          }}
        >
          <Typography variant="body2">step 2 of 2</Typography>
          <Typography variant="h4" color="secondary">
            Enter your password
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Avatar />
            <Box>
              <Typography color="secondary" variant="body2">
                {data.mail}
              </Typography>
              <Typography variant="body2">Personal Account</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              label="Password"
              required
              variant="standard"
              color="secondary"
              onKeyDown={(event) => handleEnterKey(event, "button-card2")}
              sx={{ width: "100%" }}
            />

            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              id="button-card2"
              onClick={handleSignin}
              color="secondary"
              sx={{ width: { xs: "100%", md: "25%" } }}
              variant="contained"
            >
              Continue
            </Button>
          </Box>
          <Divider />
          <Box>
            <Button
              startIcon={<KeyboardReturnIcon />}
              variant="contained"
              sx={{ color: "white" }}
              onClick={() => {
                setStep(0);
              }}
            >
              Return
            </Button>
          </Box>
        </CardContent>
      )}
    </Card>
  );
}
