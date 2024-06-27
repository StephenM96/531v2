import React, { useState } from 'react';

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [oneRepMax, setOneRepMax] = useState(null);

  const calculateOneRepMax = (weight, reps) => {
    const estimatedMax = weight * reps * (1 / 3) + weight;
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
    <div>
      <h1>1 Rep Max Calculator</h1>
      <div>
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Reps:
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
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
