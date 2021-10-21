'use strict';

module.exports = (req, res, next) => {
  if(!req.param.id) {throw new Error('ID Not Provided')}
  next()
};
