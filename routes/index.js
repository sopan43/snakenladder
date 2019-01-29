const express = require('express');
const router = express.Router();
const rn = require('random-number');
const SnakeNLadder = require('../models/gameBoard');
const Player = require('../models/player');
var gn = rn.generator({
    min: 1,
    max: 6,
    integer: true
})



router.get('/', (req, res) => {
    return res.render('index', { players: Player.fetchAll() });
});

router.post('/player/count', (req, res) => {
    if (isNaN(req.body.playerCount)) {
        req.flash('error', ('Please Enter a Valid Player Count'));
        return res.redirect('/');
    } else {
        for (let i = 0; i < req.body.playerCount; i++) {
            const player = new Player(i);
            player.save();
        }

    }
    req.flash('success', ('Players created sucessfully!! Roll initial dice'));
    return res.render('index', { players: Player.fetchAll() });
});

router.get('/players', (req, res) => {
    for (let i = 0; i < Player.fetchAll().length; i++) {
        console.log(Player.findById(i));
    }
    return res.redirect('/');
});

router.get('/initDiceRoll', (req, res) => {
    return res.render('initDiceRoll', { data: Player.fetchAll(), playerId: 0 });
});

router.get('/rollDice/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (Player.findById(id) !== undefined) {
        const dice = gn();
        if (Player.findById(id) !== undefined && Player.findById(id).initialCount === 0) {
            Player.findById(id).initialCount = dice;
        }
        if (id === Player.fetchAll().length - 1) {
            Player.sortByinitialCount();
        }
        return res.render('initDiceRoll', { data: Player.fetchAll(), playerId: id + 1 });
    } else {
        req.flash('error', ('Players does not exist!'));
        return res.redirect('/');
    }

});

router.get('/game/:id', (req, res) => {
    const id = parseInt(req.params.id);
    index = Player.getindex(id);
    const dice = gn();
    if (Player.findById(index) !== undefined) {
        Player.findById(index).diceRoll = dice;
        Player.findById(index).previousPosition = Player.findById(index).position;
        Player.findById(index).position = Player.findById(index).position + dice;
        Player.findById(index).special = false;
        const promoted = SnakeNLadder.findByStart(Player.findById(index).position);
        if (promoted !== -1) {
            Player.findById(index).position = SnakeNLadder.getEnd(promoted);
            Player.findById(index).special = true;
        }
    }
    if (Player.findById(index).position >= 100) {
        req.flash('success', (`Player ${Player.findById(index).id} WON the Game!`));
        return res.render('game', { data: Player.fetchAll(), playerId: Player.findById(index).id, restart: true });
    }
    index++;
    if (index === Player.fetchAll().length) {
        index = 0;
    }


    return res.render('game', { data: Player.fetchAll(), playerId: Player.findById(index).id, restart: false });
});

router.get('/reset', (req, res) => {
    Player.reset();
    res.redirect('/');
});

router.get('/addsnakenladder', (req, res) => {
    res.render('addSnakenLadder');
});

router.post('/addsnakenladder', (req, res) => {
    if (isNaN(req.body.start) || isNaN(req.body.end) || req.body.end === req.body.start) {
        req.flash('error', ('Please Enter a Valid Start and End Points'));
        return res.redirect('/addsnakenladder');
    } else {
        const snakeNLadder = new SnakeNLadder(req.body.start, req.body.end);
        snakeNLadder.save();
        return res.redirect('/addsnakenladder');
    }
});

router.get('/*', (req, res) => {
    res.redirect('/');
});


module.exports = router;