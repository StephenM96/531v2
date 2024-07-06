import React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const WorkoutDaysSelector = ({ selectedDays, onChange }) => {
  const daysOfWeek = ["Monday", "Tuesday", "Thursday", "Friday"];

  const handleChange = (event) => {
    onChange(event.target.name, event.target.checked);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {daysOfWeek.map((day0) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={handleChange}
                name={day}
              />
            }
            label={day}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default WorkoutDaysSelector