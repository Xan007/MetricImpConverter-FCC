const getNum = /^(\d*\.?\d*\/?\d*\.?\d*)$/
const getUnit = /(gal|L|l|mi|km|lbs|kg)$/

const separateFrac = /^(\d*\.?\d*)\/(\d*\.?\d*)$/

const convertions = {
  "gal": "L",
  "lbs": "kg",
  "mi": "km"
}

const spellingUnit = {
  "gal": "gallons",
  "L": "liters",
  "lbs": "pounds",
  "kg": "kilograms",
  "mi": "miles",
  "km": "kilometers"
}

function ConvertHandler() {

  this.getNum = function (input) {
    const { index = 0 } = input.match(getUnit) || {}

    const numberString = input.slice(0, index) || "1"

    if (!numberString.match(getNum))
      return

    const fracMatch = numberString.match(separateFrac)

    if (fracMatch)
      num = Number(fracMatch[1]) / Number(fracMatch[2])
    else
      num = Number(numberString)

    return num
  };

  this.getUnit = function (input) {
    input = input.toLowerCase()
    let [, unit] = input.match(getUnit) || []

    if (unit == "l")
      unit = unit.toUpperCase()

    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase()
    for (const [unit1, unit2] of Object.entries(convertions)) {
      if (unit1.toLowerCase() == initUnit)
        return unit2
      else if (unit2.toLowerCase() == initUnit)
        return unit1
    }
  };

  this.spellOutUnit = function (unit) {
    return spellingUnit[unit]
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const returnInit = this.getReturnUnit(initUnit)
    let returnNum;

    if (!returnInit)
      throw new Error("No return unit available")

    let convertion_eq;

    switch (returnInit) {
      case "mi":
      case "km":
        convertion_eq = miToKm
        break
      case "kg":
      case "lbs":
        convertion_eq = lbsToKg
        break
      case "gal":
      case "L":
        convertion_eq = galToL
        break
    }

    if (convertions[initUnit] === undefined)
      returnNum = initNum / convertion_eq
    else
      returnNum = initNum * convertion_eq

    return Number(returnNum.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };

}

module.exports = ConvertHandler;
