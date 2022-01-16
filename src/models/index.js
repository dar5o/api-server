'use strict';

require('dotenv').config();

// Connect to database
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' 
  : process.env.DATABASE_URL
const { Sequelize, DataTypes } = require('sequelize')

// Import models and Collection
const Collection = require('./lib/collection')
const foodSchema = require('./food.schema')
const gamesSchema = require('./games.schema')

// Production setting needed for Heroku
let sequelizeOptions = process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    }
    : {};

// Convert schemas into Sequelize models
let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const foodModel = foodSchema(sequelize, DataTypes)
const gamesModel = gamesSchema(sequelize, DataTypes)

// Create Collections form models
const foodCollection = new Collection(foodModel)
const gamesCollection = new Collection(gamesModel)

module.exports = {
  db: sequelize,
  Food: foodCollection,
  FoodModel: foodModel,
  Games: gamesCollection,
  GamesModel: gamesModel
}
