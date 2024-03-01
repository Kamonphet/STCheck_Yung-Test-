import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
  const [randomName, setRandomName] = useState('');

  const spinWheel = async () => {
    try {
      const response = await axios.get('/api/randomName');
      setRandomName(response.data.name);
    } catch (error) {
      console.error('Error fetching random name:', error);
    }
  };

  return (
    <div>
      <h1>Wheel of Fortune</h1>
      <button onClick={spinWheel}>Spin the Wheel</button>
      {randomName && <h2>{randomName}</h2>}
    </div>
  );
};

export default Game;
