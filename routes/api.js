'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res, next) => {
    const {input} = req.query

    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if (!initUnit && !initNum) {
      return res.send("invalid number and unit")
    }
    else if (!initUnit)
      return res.send("invalid unit")
    else if (!initNum)
      return res.send("invalid number")

    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)

    const outputConvertion = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    }

    res.send(outputConvertion)
  }) 

};
