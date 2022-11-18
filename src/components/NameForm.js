import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import InputAdornment from "@mui/material/InputAdornment";

export default function RunnerForm({ onSubmit }) {
  const [runner, setRunner] = useState("");

  const handleChange = (event) => {
    setRunner(event.target.value);
  };

  const handleSubmit = (event) => {
    onSubmit(runner);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <label>
          <TextField
            required
            label="Runner Name"
            onChange={handleChange}
            value={runner}
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
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Stack>
    </form>
  );
}
