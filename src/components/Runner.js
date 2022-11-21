import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";

export default function Runner({ name, lap, time, laptime, onClick }) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <DirectionsRunIcon />
        </ListItemIcon>
        <ListItemText primary={name.padEnd(4, "　")} secondary={`${lap}周目`} />
        <ListItemText primary={time} secondary={`laptime ${laptime}`} />
        <ListItemButton onClick={onClick}>
          <Button size="small" variant="outlined">
            LAP
          </Button>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export function RunnerCard({ name, lap, time, laptime, onClick }) {
  return (
    <>
      <Paper elevation={3}>
        <Typography
          style={{ display: "inline-block" }}
          component="p"
          sx={{ fontSize: 14, fontWeight: "bold" }}
        >
          {name}
        </Typography>{" "}
        <Typography
          style={{ display: "inline-block" }}
          component="p"
          sx={{ fontSize: 10 }}
          color="text.secondary"
        >
          {`${lap}周目`}
        </Typography>
        <Typography component="p" sx={{ fontSize: 14, fontWeight: "bold" }}>
          {laptime}
        </Typography>
        <Typography component="p" sx={{ fontSize: 10 }}>{`${time}`}</Typography>
        <Button size="small" onClick={onClick} variant="outlined">
          LAP
        </Button>
      </Paper>
    </>
  );
}
