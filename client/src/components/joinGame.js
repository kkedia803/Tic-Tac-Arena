// src/components/JoinGame.js
import React, { useState } from 'react';

const JoinGame = ({ handleJoinGame }) => {
  const [gameId, setGameId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleJoinGame(gameId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        className='search-input'
      />
      <button className='w3-large w3-center button' type="submit">Join Game</button>
    </form>
  );
};

export default JoinGame;
