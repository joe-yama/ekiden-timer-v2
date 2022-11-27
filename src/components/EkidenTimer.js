import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

import { Grid } from "@material-ui/core";

import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@material-ui/core/Link";
import Button from "@mui/material/Button";

import NameForm from "./NameForm";
import Runner from "./Runner";
import Time, { elapsed2timestr } from "./Time";
// import Board from "./Board";
import { Box, Divider } from "@mui/material";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
    var outputStr = "name";
    outputStr += "\n";
    for (const [runner, elapseds] of Object.entries(records)) {
      outputStr += runner + ",";
      for (const elapsed of elapseds) {
        outputStr += elapsed2timestr(elapsed, false, true) + ",";
      }
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
      <Grid container justifyContent="center">
        <Box
          position="static"
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Time
            elapsed={elapsed}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
          />
        </Box>
      </Grid>
      <NameForm onSubmit={handleAddRunner} disabled={isRunning} />
      <Grid container spacing={1} justifyContent="center">
        {Object.keys(records).map((runner) => {
          const lap = records[runner].length;
          const time = lap === 0 ? 0 : records[runner][lap - 1];
          const laptime =
            lap < 2
              ? elapsed2timestr(0, true, false)
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
      <br />
      <br />
      <Button
        variant="outlined"
        size="small"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
        disabled={isRunning}
      >
        Download Results
      </Button>
      <br />
      <br />
      <Divider />
      <br />
      <Link href="https://github.com/joe-yama/ekiden-timer-v2" target="_blank">
        <GitHubIcon />
      </Link>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
}
