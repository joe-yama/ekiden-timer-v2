import { useRef } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import InputAdornment from "@mui/material/InputAdornment";

export default function NameForm({ onSubmit, disabled }) {
  const runnerRef = useRef(null);

  const handleSubmit = (event) => {
    onSubmit(runnerRef.current.value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <label>
          <TextField
            required
            label="Runner Name"
            inputRef={runnerRef}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DirectionsRunIcon />
                </InputAdornment>
              ),
            }}
          />
        </label>
        <Button type="submit" variant="contained" disabled={disabled}>
          Add
        </Button>
      </Stack>
    </form>
  );
}
