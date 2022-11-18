import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import TimerIcon from "@mui/icons-material/Timer";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Ekiden Timer</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
