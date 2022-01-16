'use strict';

module.exports = (req, res) => { 
  console.log('Error: 404');
  res.status(404);
  res.end();
};
