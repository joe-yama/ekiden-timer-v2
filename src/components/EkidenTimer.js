import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";

import NameForm from "./NameForm";
import Runner from "./Runner";
import Time, { elapsed2timestr } from "./Time";

function ControlButtons({ onStart, onStop, onReset }) {
  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={2} />
      <Grid item xs={8}>
        <IconButton aria-label="start" onClick={onStart}>
          <PlayCircleFilledIcon />
        </IconButton>
        <IconButton aria-label="stop" onClick={onStop}>
          <PauseCircleIcon />
        </IconButton>
        <IconButton aria-label="reset" onClick={onReset}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
}

export function EkidenTimer(props) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runners, setRunners] = useState([]);
  const [records, setRecords] = useState({});

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setElapsed(0);
    setRunners([]);
    setRecords({});
  };

  const handleAddRunner = (runner) => {
    if (!runner || runners.includes(runner)) return;
    setRunners([...runners, runner]);
    let curRecords = { ...records };
    curRecords[runner] = [elapsed];
    setRecords(curRecords);
    console.log(records);
  };

  const handleLap = (runner) => {
    const curElapsed = elapsed;
    let curRecords = { ...records };
    curRecords[runner] = [...curRecords[runner], curElapsed];
    setRecords(curRecords);
    console.log(curRecords);
  };

  return (
    <>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Typography variant="h3">
            <Time elapsed={elapsed} />
          </Typography>
        </Grid>
        <Grid item xs={2} />

        <ControlButtons
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
        />

        <Grid item xs={2} />
        <Grid item xs={8}>
          <NameForm onSubmit={handleAddRunner} />
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={1} />
        <Grid item xs={10}>
          <List>
            {Object.keys(records).map((runner) => {
              const lap = records[runner].length;
              const time = lap === 0 ? 0 : records[runner][lap - 1];
              const laptime =
                lap < 2
                  ? "N/A"
                  : elapsed2timestr(time - records[runner][lap - 2], false);
              return (
                <Runner
                  key={runner}
                  name={runner}
                  lap={lap}
                  time={elapsed2timestr(time)}
                  laptime={laptime}
                  onClick={() => handleLap(runner)}
                />
              );
            })}
          </List>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </>
  );
}
