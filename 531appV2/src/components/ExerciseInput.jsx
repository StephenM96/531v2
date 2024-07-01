import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const ExerciseInput = ({ id, label, value, onChange, adornment }) => {
  return (
    <TextField
      id={id}
      label={label}
      type="number"
      margin="normal"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
      }}
    />
  );
};

export default ExerciseInput;
