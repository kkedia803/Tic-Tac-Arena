// src/components/CreateGame.js
import React from 'react';

const CreateGame = ({ handleCreateGame }) => {
  return (
    <div>
      <button className='w3-xxxlarge w3-animate-top button' onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

export default CreateGame;
