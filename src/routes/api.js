'use strict';

const express = require('express');
const router = express.Router();

const { Games, Foods } = require('../models');

const Collection = require('../models/lin/collection.js');

const modelMap = {
  Games: new Collection(Games),
  Foods: new Collection(Foods),
};

router.use('/:model', function(req, res, next) {
  const model = modelMap[req.params.model];

  if(!model) {
    next('no model');
  }

  req.model = model;
  console.log(model);
  next();
});

router.get('/:model', async(req, res) => {
  const model = req.model;
  let records = await model.read;
  res.send(records);
});

router.get('/:model/:id', async(req, res) => {
  const model = req.model;
  const id = req.params.id;
  let singleRecord = await model.read(id);
  res.send(singleRecord);
});

router.post('/:model', async(req, res) => {
  const model = req.model;
  const json = req.body;
  let newRecord = await model.create(json);
  res.send(newRecord);
});

module.exports = router;
