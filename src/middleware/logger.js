'use strict';

module.exports = (req, res, next)=>{
  console.log(`method used: ${req.method}, path used: ${req.path}`);
  next();
};
