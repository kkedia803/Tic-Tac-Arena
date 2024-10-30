const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const { v4: uuidv4 } = require('uuid');

//creating new game
router.post('/create', async(req,res)=>{
    const gameId = uuidv4();
    const newGame = new Game({gameId});
    await newGame.save();
    res.json({gameId});
});

//joining exisitng game
router.get('/:gameId', async(req,res)=>{
    const game = await Game.findOne({gameId: req.params.gameId});
    if(!game) return res.status(400).json({error:'Game not found'});
    res.json(game);
});

module.exports = router;