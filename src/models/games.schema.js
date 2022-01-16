'use strict';

const Games = (sequelize, DataTypes) => sequelize.define('Games', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Games;
