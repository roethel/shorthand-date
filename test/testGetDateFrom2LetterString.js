/**
 * Created by roethel on 11/20/16.
 *
 * Testing the function to create a valid date from 2-character string
 *
 * Tests
 *   1. valid dm, e.g. 52 should create 2016-05-02
 *      for reference date 2016-07-15
 *   2. valid dm with last years year, e.g. 85 should create 2015-08-05
 *      for reference date 2016-07-15
 *   3. Invalid date e.g 10 should retrun undefined
 */

QUnit.test( "Testing getDateFrom2LetterString", function( assert ) {
    var referenceDate = new Date("2016-07-15 12:10:01");
    var dc = new ShorthandDate(referenceDate);

    // 1. valid dm
    var testDateStr1 = '52';
    var expectedDateStr1 = "2016-05-02";
    assert.equal(dc.getDateFrom2LetterString(testDateStr1), expectedDateStr1,
        "Valid date string " + testDateStr1 + " returned " + expectedDateStr1);

    // 2. valid dm with last year's date
    var testDateStr2 = '85';
    var expectedDateStr2 = "2015-08-05";
    assert.equal(dc.getDateFrom2LetterString(testDateStr2), expectedDateStr2,
        "Valid date string " + testDateStr2 + " returned " + expectedDateStr2);

    // 3. invalid dm 10
    var testDateStr3 = '10';
    var expectedDateStr3 = undefined;
    assert.equal(dc.getDateFrom2LetterString(testDateStr3), expectedDateStr3,
        "Invalid date string " + testDateStr3 + " returned " + expectedDateStr3);

});