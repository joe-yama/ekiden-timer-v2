import React, { useState, useEffect } from "react";
import { GridList, GridListTile, Typography } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import NameForm from "./NameForm";
import Runner, { RunnerCard } from "./Runner";
import Time, { elapsed2timestr } from "./Time";
import Board from "./Board";

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
  // records = {
  //   taro: [],
  //   jiro: [],
  // };

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

  const handleDownload = () => {
    console.log("download");
    let outputStr = "name";
    outputStr += "\n";
    for (const [runner, elapseds] of Object.entries(records)) {
      console.log(runner, elapseds);
      outputStr += runner + ",";
      elapseds.map((elapsed) => {
        outputStr += elapsed2timestr(elapsed, false, true) + ",";
      });
      outputStr += "\n";
    }
    // const shouldJIS = false;
    // if (shouldJIS) {
    //   // encode to sjis
    //   outputStrEncoded = Encoding.stringToCode(outputStr);
    //   outputStrSjis = Encoding.convert(outputStrEncoded, "sjis", "unicode");
    //   u8a = new Uint8Array(outputStrSjis);
    // } else {
    //   u8a = outputStr;
    // }
    var blob = new Blob([outputStr], { type: "text/csv" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "results.csv";
    link.click();
  };

  return (
    <>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h3">
            <Time elapsed={elapsed} />
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ControlButtons
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
          />
        </Grid>

        <Grid item xs={12}>
          <NameForm onSubmit={handleAddRunner} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1} justifyContent="center">
        {Object.keys(records).map((runner) => {
          const lap = records[runner].length;
          const time = lap === 0 ? 0 : records[runner][lap - 1];
          const laptime =
            lap < 2
              ? elapsed2timestr(0)
              : elapsed2timestr(time - records[runner][lap - 2], true, false);
          return (
            <React.Fragment key={runner}>
              <Grid item xs={10}>
                <Runner
                  name={runner}
                  lap={lap}
                  time={elapsed2timestr(time)}
                  laptime={laptime}
                  onClick={() => handleLap(runner)}
                />
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
      <br />
      {/* <Board data={records} /> */}
      <Button
        size="small"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
      >
        Download Results
      </Button>
    </>
  );
}
