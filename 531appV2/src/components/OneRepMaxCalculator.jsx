import React, { useState } from "react";
import {
  InputAdornment,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
      fullWidth
    />
  );
};

const OneRepMaxCalculator = () => {
  const [inputs, setInputs] = useState({
    backSquat: { weight: "", reps: "", oneRepMax: null },
    benchPress: { weight: "", reps: "", oneRepMax: null },
    deadlift: { weight: "", reps: "", oneRepMax: null },
    overheadPress: { weight: "", reps: "", oneRepMax: null },
  });

  const calculateOneRepMax = (weight, reps) => {
    const estimatedMax = weight * reps * (1 / 30) + weight;
    return Math.floor(estimatedMax / 5) * 5;
  };

  const handleInputChange = (exercise, field, value) => {
    setInputs((prev) => ({
      ...prev,
      [exercise]: { ...prev[exercise], [field]: value },
    }));
  };

  const handleCalculate = () => {
    const newInputs = { ...inputs };
    for (let exercise in newInputs) {
      const weightNum = parseFloat(newInputs[exercise].weight);
      const repsNum = parseInt(newInputs[exercise].reps, 10);

      if (!isNaN(weightNum) && !isNaN(repsNum)) {
        newInputs[exercise].oneRepMax = calculateOneRepMax(weightNum, repsNum);
      } else {
        newInputs[exercise].oneRepMax = null;
      }
    }
    setInputs(newInputs);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker id="cycle-start-date" label="Cycle Start Date" />
      </LocalizationProvider>
      <Typography variant="h4" gutterBottom>
        1 Rep Max Calculator
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(inputs).map((exercise) => (
          <Grid item xs={12} md={6} key={exercise}>
            <Typography variant="h6">
              {exercise
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "row" }}>
              <ExerciseInput
                id={`${exercise}-weight-input`}
                label="Weight"
                value={inputs[exercise].weight}
                onChange={(e) =>
                  handleInputChange(exercise, "weight", e.target.value)
                }
                adornment="lb"
              />
              <ExerciseInput
                id={`${exercise}-reps-input`}
                label="Reps"
                value={inputs[exercise].reps}
                onChange={(e) =>
                  handleInputChange(exercise, "reps", e.target.value)
                }
                adornment="Reps"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        sx={{ mt: 2 }}
      >
        Calculate
      </Button>
      {Object.keys(inputs).map(
        (exercise) =>
          inputs[exercise].oneRepMax !== null && (
            <Typography key={exercise} variant="body1" sx={{ mt: 1 }}>
              {exercise
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}{" "}
              1 Rep Max: {inputs[exercise].oneRepMax} lbs
            </Typography>
          )
      )}
    </Box>
  );
};

export default OneRepMaxCalculator;
