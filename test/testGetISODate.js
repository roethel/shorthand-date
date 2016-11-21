/**
 * Created by roethel on 11/21/16.
 *
 * Test the method getISODate(dateString)
 * The method acts as wrapper to the getDateFrom... methods and delegates these using
 * length of the dateString parameter. Testing of these methods is not repeated here
 * but instead is done through the method specific test scripts. Only functionality
 * outside of these methods is tested here.
 *
 * Tests
 *   1. providing an ISO date should return the ISO date string
 *   2. providing a valid shorthand, e.g. 0403 should return the valid shorthand completion.
 *   3. providing an invalid date shorthand, e.g. 12018 should return undefined
 *   4. proving an 'blablabla' should return undefined.
 */

QUnit.test( "Testing ShorthandDate.getISODate()", function( assert ) {
    var referenceDate = new Date("2016-07-15 12:10:01");
    var dc = new ShorthandDate(referenceDate);

    // 1. valid iso date
    var testDateStr1 = '2016-05-02';
    var expectedDateStr1 = "2016-05-02";
    assert.equal(dc.getISODate(testDateStr1), expectedDateStr1,
        "Valid iso date string '" + testDateStr1 + "' returned " + expectedDateStr1);

    // 2. valid shorthand
    var testDateStr2 = '0403';
    var expectedDateStr2 = "2016-04-03";
    assert.equal(dc.getISODate(testDateStr2), expectedDateStr2,
        "Valid date shorthand '" + testDateStr2 + "' returned " + expectedDateStr2);

    // 3. invalid shorthand
    var testDateStr3 = '12018';
    var expectedDateStr3 = undefined;
    assert.equal(dc.getISODate(testDateStr3), expectedDateStr3,
        "Invalid date shorthand '" + testDateStr3 + "' returned " + expectedDateStr3);

    // 4. invalid date string
    var testDateStr4 = 'blabla';
    var expectedDateStr4 = undefined;
    assert.equal(dc.getISODate(testDateStr4), expectedDateStr4,
        "Invalid date string '" + testDateStr4 + "' returned " + expectedDateStr4);

    // 5. invalid date string that is almost an iso date
    var testDateStr5 = '05-10-2016';
    var expectedDateStr5 = undefined;
    assert.equal(dc.getISODate(testDateStr5), expectedDateStr5,
        "Invalid iso date string '" + testDateStr5 + "' returned " + expectedDateStr5);

    // 6. invalid date string that is almost an iso date
    var testDateStr6 = '2020-32-45';
    var expectedDateStr6 = undefined;
    assert.equal(dc.getISODate(testDateStr6), expectedDateStr6,
        "Invalid iso date string '" + testDateStr6 + "' returned " + expectedDateStr6);


});
