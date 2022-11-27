import { Typography } from "@material-ui/core";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

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
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleAgreeReset = () => {
    onReset();
    setIsOpenDialog(false);
  };

  return (
    <>
      <IconButton aria-label="start" onClick={onStart}>
        <PlayCircleFilledIcon />
      </IconButton>
      <IconButton aria-label="stop" onClick={onStop}>
        <PauseCircleIcon />
      </IconButton>
      <IconButton aria-label="reset" onClick={() => setIsOpenDialog(true)}>
        <DeleteIcon />
      </IconButton>

      <Dialog onClose={handleCloseDialog} open={isOpenDialog}>
        <DialogTitle>
          時間をリセットして、走者の履歴もすべて削除しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ラップタイムや走者の名前も全て削除されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>キャンセル</Button>
          <Button onClick={handleAgreeReset} autoFocus>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function Time({ elapsed, onStart, onStop, onReset }) {
  return (
    <>
      <Typography variant="h3">{elapsed2timestr(elapsed)}</Typography>
      <ControlButtons onStart={onStart} onStop={onStop} onReset={onReset} />
    </>
  );
}
