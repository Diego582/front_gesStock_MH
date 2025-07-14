import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Link } from "react-router-dom";

export default function NavSales() {
  const categories = ["Remitos", "Facturaciones"];

  return (
    <Box
      sx={{
        width: "95vw",
        height: "8vh",
        backgroundColor: "tertiary.main",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {categories.map((text, index) => (
        <Box key={index}>
          <Link
            to={"/" + text.toLowerCase()}
            style={{ textDecoration: "none" }}
          >
            <Box>
              <Tooltip title={text}>
                <IconButton sx={{}}>
                  {text === "Remitos" ? (
                    <FactCheckIcon sx={{ color: "white" }} />
                  ) : (
                    <CastConnectedIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
