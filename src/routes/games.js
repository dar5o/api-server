'use strict';

const express = require('express');

const { Games } = require('../models/index');

const router = express.Router();

// Restful Route Declarations
router.get('/games', getGames);
router.get('/games/:id', oneGame);
router.post('/games', createOneGame);
router.put('/games/:id', updateOneGame);
router.delete('/games/:id', deleteOneGame);

// Restful Router Handlers
async function getGames(req, res) {
  let allGames = await Games.findAll();
  res.status(200).json(allGames);
}

async function oneGame(req, res) {
  const id = ~~req.params.id;
  let oneGame = await Games.findOne({ where: {id: id}});
  res.status(200).sebd(oneGame);
}

async function createOneGame(req, res) {
  let oneGameData = req.body;
  let oneGame = await Games.create(oneGameData);
  res.status(200).send(oneGame);
}

async function updateOneGame(req, res) {
  const id = ~~req.params.id;
  const oneGameData = req.body;
  let oneGame = await Games.findOne({ where: {id: id}});
  let updatedOneGame = await oneGame.update(oneGameData);
  res.status(200).send(updatedOneGame);
}

async function deleteOneGame(req, res) {
  const id = ~~req.params.id;
  let deletedGame = await Games.destroy({ where: {id:id}});
  res.status(200).json(deletedGame);
}

module.exports = router;
