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
import WorkoutPlan from './WorkoutPlan'; 

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
    backSquat: { weight: "", reps: "", oneRepMax: null, trainingMaxPercentage: 85, trainingMax: null },
    benchPress: { weight: "", reps: "", oneRepMax: null, trainingMaxPercentage: 85, trainingMax: null },
    deadlift: { weight: "", reps: "", oneRepMax: null, trainingMaxPercentage: 85, trainingMax: null },
    overheadPress: { weight: "", reps: "", oneRepMax: null, trainingMaxPercentage: 85, trainingMax: null },
  });
  const [startDate, setStartDate] = useState(null);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);

  const calculateOneRepMax = (weight, reps) => {
    const estimatedMax = weight * reps * (1 / 30) + weight;
    return Math.floor(estimatedMax / 5) * 5;
  };

  const calculateTrainingMax = (oneRepMax, percentage) => {
    if (oneRepMax === null || isNaN(percentage) || percentage <= 0) {
      return null;
    }
    const trainingMax = oneRepMax * (percentage / 100);
    return Math.floor(trainingMax / 5) * 5;
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
      const percentage = parseFloat(newInputs[exercise].trainingMaxPercentage);

      if (!isNaN(weightNum) && !isNaN(repsNum)) {
        newInputs[exercise].oneRepMax = calculateOneRepMax(weightNum, repsNum);
      } else {
        newInputs[exercise].oneRepMax = null;
      }

      newInputs[exercise].trainingMax = calculateTrainingMax(newInputs[exercise].oneRepMax, percentage);
    }
    setInputs(newInputs);
    setShowWorkoutPlan(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {!showWorkoutPlan ? (
        <>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              id="cycle-start-date"
              label="Cycle Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
            />
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
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
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
                  <ExerciseInput
                    id={`${exercise}-percentage-input`}
                    label="Training Max %"
                    value={inputs[exercise].trainingMaxPercentage}
                    onChange={(e) =>
                      handleInputChange(exercise, "trainingMaxPercentage", e.target.value)
                    }
                    adornment="%"
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
                <Box key={exercise} sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    {exercise
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}{" "}
                    1 Rep Max: {inputs[exercise].oneRepMax} lbs
                  </Typography>
                  {inputs[exercise].trainingMax !== null && (
                    <Typography variant="body1">
                      Training Max ({inputs[exercise].trainingMaxPercentage}%): {inputs[exercise].trainingMax} lbs
                    </Typography>
                  )}
                </Box>
              )
          )}
        </>
      ) : (
        <WorkoutPlan trainingMaxes={Object.fromEntries(Object.entries(inputs).map(([k, v]) => [k, v.trainingMax]))} startDate={startDate} />
      )}
    </Box>
  );
};

export default OneRepMaxCalculator;
