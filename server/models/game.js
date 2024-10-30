const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: { type: String, required: true, unique: true },
  board: { type: Array, default: Array(9).fill(null) },
  currentPlayer: { type: String, default: 'X' },  // 'X' or 'O'
  playerX: { type: String },  // Socket ID of Player X
  playerO: { type: String },  // Socket ID of Player O
  winner: { type: String, default: null },  // 'X', 'O', or 'draw'
});

module.exports = mongoose.models.Game || mongoose.model('Game', gameSchema);
