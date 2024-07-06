import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import moment from 'moment';

//Rounds to nearest 5 lb increment
const calculateWeight = (trainingMax, percentage) => {
  return Math.floor((trainingMax * (percentage / 100)) / 5) * 5;
};

const generateWorkoutPlan = (trainingMaxes, startDate, selectedDays) => {
  const plan = [];
  const percentages = [
    { week: 1, sets: [65, 75, 85] },
    { week: 2, sets: [70, 80, 90] },
    { week: 3, sets: [75, 85, 95] }
  ];

  let currentDate = moment(startDate);

  for (let cycle = 1; cycle <= 2; cycle++) {
    percentages.forEach(({ week, sets }) => {
      const weekPlan = {
        week: (cycle - 1) * 3 + week,
        
        exercises: {}
      };
      
      Object.keys(trainingMaxes).forEach(exercise => {
        const tm = trainingMaxes[exercise];
        weekPlan.exercises[exercise] = sets.map(percentage => calculateWeight(tm, percentage));
      });

      plan.push(weekPlan);
      currentDate.add(1, 'week');
    });

    if (cycle === 1) {
      //Increase training maxes for next cycle, bench and ohp by 5 lbs and squat and deadlift by 10 lbs
      trainingMaxes.benchPress += 5;
      trainingMaxes.overheadPress += 5;
      trainingMaxes.backSquat += 10;
      trainingMaxes.deadlift += 10;
    }
  }

  return plan;
};

const WorkoutPlan = ({ trainingMaxes, startDate }) => {
  const workoutPlan = generateWorkoutPlan(trainingMaxes, startDate);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Workout Plan</Typography>
      <Grid container spacing={2}>
        {workoutPlan.map(week => (
          <Grid item xs={12} key={week.week}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Week {week.week} ({week.date})</Typography>
              {Object.keys(week.exercises).map(exercise => (
                <Box key={exercise} sx={{ marginTop: 1 }}>
                  <Typography variant="body1">
                    {exercise.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  </Typography>
                  <ul>
                    {week.exercises[exercise].map((weight, index) => (
                      <li key={index}>Set {index + 1}: {weight} lbs</li>
                    ))}
                  </ul>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WorkoutPlan;