import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import IconButton from "@mui/material/IconButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export function elapsed2timestr(elapsed, includeMs = true, includeH = true) {
  const h = parseInt(elapsed / 60 / 60 / 1000, 10)
    .toString()
    .padStart(2, "0");
  const m = (parseInt(elapsed / 60 / 1000, 10) % 60)
    .toString()
    .padStart(2, "0");
  const s = (parseInt(elapsed / 1000, 10) % 60).toString().padStart(2, "0");
  const ms = parseInt((elapsed % 1000) / 10, 10)
    .toString()
    .padStart(2, "0");
  let timestr = m + ":" + s;
  if (includeH) timestr = h + ":" + timestr;
  if (includeMs) timestr = timestr + "." + ms;
  return timestr;
}

function ControlButtons({ onStart, onStop, onReset }) {
  return (
    <>
      <IconButton aria-label="start" onClick={onStart}>
        <PlayCircleFilledIcon />
      </IconButton>
      <IconButton aria-label="stop" onClick={onStop}>
        <PauseCircleIcon />
      </IconButton>
      <IconButton aria-label="reset" onClick={onReset}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}

export default function Time({ elapsed, onStart, onStop, onReset }) {
  // return (
  //   <>
  //     {parseInt(elapsed / 60 / 60 / 1000, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //     <span>:</span>
  //     {parseInt(elapsed / 60 / 1000, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //     <span>:</span>
  //     {parseInt(elapsed / 1000, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //     <span>.</span>
  //     {parseInt((elapsed % 1000) / 10, 10)
  //       .toString()
  //       .padStart(2, "0")}
  //   </>
  // );
  // return elapsed2timestr(elapsed);
  return (
    <>
      <Typography variant="h3">{elapsed2timestr(elapsed)}</Typography>
      <ControlButtons onStart={onStart} onStop={onStop} onReset={onReset} />
    </>
  );
}
