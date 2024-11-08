import React, { useState, useEffect } from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import Board from './components/board';
import CreateGame from './components/createGame';
import JoinGame from './components/joinGame';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5000');

function App() {
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [myPlayer, setMyPlayer] = useState(null);

  useEffect(() => {
    socket.on('updateBoard', ({ board, currentPlayer }) => {
      setBoard(board);
      setCurrentPlayer(currentPlayer);
    });

    socket.on('gameDraw', () => {
      toast.info("It's a draw!"); // Notify both players
      setTimeout(()=>{
        resetGame();
      }, 2000); // Reset the game after the notification
    });

    socket.on('gameWon', ({ winner }) => {
      toast.success(`Player ${winner} won the Game`); // Notify both players
      setTimeout(() => {
        resetGame();
      }, 2000);
    });


    return () => {
      socket.off('updateBoard');
    };

  }, []);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return 'X' or 'O'
      }
    }
    return null; // No winner
  };

  const handleCreateGame = async () => {
    const res = await axios.post('http://localhost:5000/create');
    setGameId(res.data.gameId);
    setMyPlayer('X');
    socket.emit('joinGame', { gameId: res.data.gameId, player: 'X' });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X'); // Reset to starting player
    setMyPlayer(null);
    setGameId(null); // Reset the game ID to null
  };

  const copyText = () => {
    const cop = document.getElementById('gameId');
    navigator.clipboard.writeText(`Use this Id to play TIC-TAC-TOE with me !!! ${cop.innerText}`)

    toast.success('Game Id copied to clipboard!');
  }

  const handleJoinGame = (id) => {
    setGameId(id);
    setMyPlayer('O');
    socket.emit('joinGame', { gameId: id, player: 'O' });
  };

  const handleClick = (index) => {
    if (!board[index] && myPlayer === currentPlayer) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      const winner = checkWinner(newBoard);

      if (winner) {

        socket.emit('gameEnded', { gameId, draw: false, winner });

      } else if (newBoard.every(cell => cell)) {

        socket.emit('gameEnded', { gameId, draw: true });
      } else {
        socket.emit('makeMove', { gameId, board: newBoard, currentPlayer: currentPlayer === 'X' ? 'O' : 'X' });
      }
    }
  };

  return (
    <div className='App'>
      <ToastContainer position='top-center' autoClose={3000} />
      <div className='w3-display-middle button-container'>
        {!gameId && (
          <>
            <h1>Tic Tac Arena</h1>
            <CreateGame handleCreateGame={handleCreateGame} />
            <JoinGame handleJoinGame={handleJoinGame} />
          </>
        )}

        {gameId && (
          <>
            <div className='shareBox'>
              <h2 id='gameId'>Game ID : {gameId}</h2>
              <button onClick={copyText} className='w3-large w3-center button'>Share Id</button>
            </div>
            <h3>Current Player:{currentPlayer}</h3>
            <Board board={board} handleClick={handleClick} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;