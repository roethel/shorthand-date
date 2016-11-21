/**
 * Created by roethel on 11/20/16.
 * Test creating a date from a 3-character string
 *
 * Tests
 *   1. mdd format with unambigous string, e.g. 412
 *   2. mmd, on ambiguous string. e.g. '122'.
 *      This will return 2016-12-02 since this is closer to the reference
 *      date of 2016-12-15 than 2016-01-22
 *   3. mdd, on ambiguous string, e.g. '122' on reference date 2016-06-15
 *   4. mmd on ambiguous string with rollover to prior year,
 *      e.g. 122 on reference date 2016-01-15
 *   5. Invalid date, e.g. 674
 */

QUnit.test( "Testing getDateFrom3LetterString", function( assert ) {
    var referenceDate1 = new Date("2016-12-15 12:10:01");
    var dc1 = new ShorthandDate(referenceDate1);

    // 1. mdd
    var testDateStr1 = '412';
    var expectedDateStr1 = "2016-04-12";
    assert.equal(dc1.getDateFrom3LetterString(testDateStr1), expectedDateStr1,
        "Valid date string " + testDateStr1 + " returned " + expectedDateStr1);

    // 2. mmd
    var testDateStr2 = '122';
    var expectedDateStr2 = "2016-12-02";
    assert.equal(dc1.getDateFrom3LetterString(testDateStr2), expectedDateStr2,
        "Valid date string " + testDateStr2 + " returned " + expectedDateStr2);

    // 3. mdd
    var referenceDate2 = new Date("2016-06-15 12:10:01");
    var dc2 = new ShorthandDate(referenceDate2);
    var testDateStr3 = '122';
    var expectedDateStr3 = "2016-01-22";
    assert.equal(dc2.getDateFrom3LetterString(testDateStr3), expectedDateStr3,
        "Valid date string " + testDateStr3 + " returned " + expectedDateStr3);

    // 4. mmd with year adjustment
    var referenceDate3 = new Date("2016-01-15 12:10:01");
    var dc3 = new ShorthandDate(referenceDate3);
    var testDateStr4 = '122';
    var expectedDateStr4 = "2015-12-02";
    assert.equal(dc3.getDateFrom3LetterString(testDateStr4), expectedDateStr4,
        "Valid date string " + testDateStr4 + " returned " + expectedDateStr4);

    // 5. Invalid date
    var testDateStr5 = '674';
    var expectedDateStr5 = undefined;
    assert.equal(dc3.getDateFrom3LetterString(testDateStr5), expectedDateStr5,
        "Invalid date string " + testDateStr5 + " returned " + expectedDateStr5);


});