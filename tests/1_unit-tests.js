const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test("convertHandler should should correctly convert gal to L", function () {
        assert.strictEqual(convertHandler.getNum("1kg"), 1, "should correctly convert gal to L")
    })
    test("convertHandler should correctly read a decimal number input.", function () {
        assert.strictEqual(convertHandler.getNum("1.2kg"), 1.2, "correctly read a decimal number input.")
    })
    test("convertHandler should correctly read a fractional input.", function () {
        assert.strictEqual(convertHandler.getNum("1/2kg"), 0.5, "correctly read a fractional input.")
    })
    test("convertHandler should correctly read a fractional input with a decimal.", function () {
        assert.strictEqual(convertHandler.getNum("1.2/2kg"), 0.6, "correctly read a fractional input with a decimal.")
    })
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
        assert.isUndefined(convertHandler.getNum("1/2/3kg"), "correctly return an error on a double-fraction (i.e. 3/2/3).")
    })
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
        assert.strictEqual(convertHandler.getNum("kg"), 1, "correctly default to a numerical input of 1 when no numerical input is provided.")
    })
    test("convertHandler should correctly read each valid input unit.", function () {
        assert.strictEqual(convertHandler.getUnit("gal"), "gal", "correctly read gal valid input unit.")
        assert.strictEqual(convertHandler.getUnit("L"), "L", "correctly read L valid input unit.")
        assert.strictEqual(convertHandler.getUnit("mi"), "mi", "correctly read mi valid input unit.")
        assert.strictEqual(convertHandler.getUnit("km"), "km", "correctly read km valid input unit.")
        assert.strictEqual(convertHandler.getUnit("lbs"), "lbs", "correctly read lbs valid input unit.")
        assert.strictEqual(convertHandler.getUnit("kg"), "kg", "correctly read kg input unit.")
    })
    test("convertHandler should correctly return an error for an invalid input unit.", function () {
        assert.isUndefined(convertHandler.getUnit("4kilomegagram"), "Correctly return an error for an invalid input unit.")
    })
    test("convertHandler should should correctly convert gal to L", function () {
        assert.strictEqual(convertHandler.getReturnUnit("gal"), "L", "return the correct return unit for gal valid input unit.")
        assert.strictEqual(convertHandler.getReturnUnit("L"), "gal", "return the correct return unit for L valid input unit.")
        assert.strictEqual(convertHandler.getReturnUnit("mi"), "km", "return the correct return unit for mi valid input unit.")
        assert.strictEqual(convertHandler.getReturnUnit("km"), "mi", "return the correct return unit for km valid input unit.")
        assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg", "return the correct return unit for lbs valid input unit.")
        assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs", "return the correct return unit for kg valid input unit.")
    })
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
        assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons", "correctly return the spelled-out string unit for gal valid input unit.")
        assert.strictEqual(convertHandler.spellOutUnit("L"), "liters", "correctly return the spelled-out string unit for L valid input unit.")
        assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles", "correctly return the spelled-out string unit for mi valid input unit.")
        assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers", "correctly return the spelled-out string unit for km valid input unit.")
        assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds", "correctly return the spelled-out string unit for lbs valid input unit.")
        assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms", "correctly return the spelled-out string unit for kgs valid input unit.")
    })
    test("convertHandler should correctly convert gal to L.", function () {
        assert.strictEqual(convertHandler.convert("1", "gal"), 3.78541, "should correctly convert gal to L")
    })
    test("convertHandler should correctly convert L to gal.", function () {
        assert.strictEqual(convertHandler.convert("1", "L"), 0.26417, "should correctly convert L to gal")
    })
    test("convertHandler should correctly convert mi to km.", function () {
        assert.strictEqual(convertHandler.convert("1", "mi"), 1.60934, "should correctly convert mi to km")
    })
    test("convertHandler should correctly convert km to mi.", function () {
        assert.strictEqual(convertHandler.convert("1", "km"), 0.62137, "should correctly convert km to mi")
    })
    test("convertHandler should correctly convert lbs to kg.", function () {
        assert.strictEqual(convertHandler.convert("1", "lbs"), 0.45359, "should correctly convert lbs to kg")
    })
    test("convertHandler should correctly convert kg to lbs.", function () {
        assert.strictEqual(convertHandler.convert("1", "kg"), 2.20462, "should correctly convert kg to lbs")
    })
});