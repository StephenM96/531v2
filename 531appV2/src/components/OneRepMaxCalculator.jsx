import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [oneRepMax, setOneRepMax] = useState(null);

  const calculateOneRepMax = (weight, reps) => {
    const estimatedMax = weight * reps * (1 / 30) + weight;
    return Math.floor(estimatedMax / 5) * 5;
  };

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);

    if (!isNaN(weightNum) && !isNaN(repsNum)) {
      setOneRepMax(calculateOneRepMax(weightNum, repsNum));
    } else {
      setOneRepMax(null);
    }
  };

  return (
    <div sx={"display: flex; align-items: "}>
      <h1>1 Rep Max Calculator</h1>
      <div>
        <div class="">
          <TextField
            id="back-squat-weight-input"
            label="Back Squat"
            type="number"
            margin="normal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">lb</InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <div>
          <TextField
            id="back-squat-reps-input"
            type="number"
            margin="normal"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Reps</InputAdornment>
              ),
            }}
          ></TextField>
        </div>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {oneRepMax !== null && (
        <div>
          <h2>Estimated 1 Rep Max: {oneRepMax} lbs</h2>
        </div>
      )}
    </div>
  );
};

export default OneRepMaxCalculator;
