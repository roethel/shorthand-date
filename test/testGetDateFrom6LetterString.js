/**
 * Created by roethel on 11/20/16.
 * Testing function DateCompleter.getDateFrom6LetterString
 *
 * Tests
 *   1 valid date in current year
 *   2 valid date in future
 *   3 parameter is not a valid 6-character date string
 *   4 invalid date values
 */

QUnit.test( "Testing getDateFrom6LetterString", function( assert ) {
    var referenceDate = new Date("2016-11-01 12:10:01");
    var dc = new ShorthandDate(referenceDate);

    // Test 1
    var testDateStr1 = '100116';
    var expectedDateStr1 = "2016-10-01";
    assert.equal(dc.getDateFrom6LetterString(testDateStr1), expectedDateStr1,
        "Valid date string '" + testDateStr1 +
        "' returned expected date " + expectedDateStr1);

    // Test 2 -- create future date
    var testDateStr2 = '100120';
    var expectedDateStr2 = "2020-10-01";
    assert.equal(dc.getDateFrom6LetterString(testDateStr2), expectedDateStr2,
        "Valid date string '" + testDateStr2 +
        "' returned expected date " + expectedDateStr2);

    // Test 3
    var testDateStr3 = '1001A0';
    var expectedDateStr3 = undefined;
    assert.equal(dc.getDateFrom6LetterString(testDateStr3), expectedDateStr3,
        "Invalid date string '" + testDateStr3 +
        "' returned " + expectedDateStr3);

    // Test 4
    var testDateStr4 = '150116';
    var expectedDateStr4 = undefined;
    assert.equal(dc.getDateFrom6LetterString(testDateStr4), expectedDateStr4,
        "Invalid date string '" + testDateStr4 +
        "' returned " + expectedDateStr4);
});
