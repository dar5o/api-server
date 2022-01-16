'use strict';

module.exports = (req, res, next) => {
  if(!req.param.id) {throw new Error('No ID provided')}
  next()
};
