import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

export default function Runner({ name, lap, time, laptime, onClick }) {
  const primaryStr = name;
  const secondaryStr = time;
  const handleClick = () => {};
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <DirectionsRunIcon />
        </ListItemIcon>
        <ListItemText primary={name} secondary={time} />
        <ListItemText primary={laptime} secondary="ラップタイム" />
        <ListItemText primary={lap} secondary="周目" />
      </ListItemButton>
    </ListItem>
  );
}
