import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Paper from "@mui/material/Paper";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

const backgroundColor = "hsl(221, 0%, 85%);";

export default function FixedBottomNavigation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          sx={{ backgroundColor, boxShadow: "0 0 0.1rem 0rem black" }}
        >
          <BottomNavigationAction
            label="New Room"
            icon={<SummarizeOutlinedIcon />}
            onClick={() => {
              navigate("/rooms/create");
            }}
          />
          <BottomNavigationAction
            label="New Tenant"
            icon={<LibraryBooksIcon />}
            onClick={() => {
              navigate("/tenants/create");
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
