import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function WeightInput() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker id="cycle-start-date" label="Cycle Start Date" />
      </LocalizationProvider>

      <TextField
        id="back-squat-input"
        label="Back Squat"
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">lb</InputAdornment>,
        }}
      />
      <TextField
        id="bench-press-input"
        label="Bench Press"
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">lb</InputAdornment>,
        }}
      />
      <TextField
        id="deadlift-input"
        label="Straight-bar Deadlift"
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">lb</InputAdornment>,
        }}
      />
      <TextField
        id="ohp-input"
        label="Overhead Press"
        variant="standard"
        InputProps={{
          startAdornment: <InputAdornment position="start">lb</InputAdornment>,
        }}
      />
    </Box>
  );
}
