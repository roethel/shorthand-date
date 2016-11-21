/**
 * Created by roethel on 11/20/16.
 */


QUnit.test( "Testing getDateFrom4LetterString", function( assert ) {
    var referenceDate = new Date("2016-11-01 12:10:01");
    var dc = new ShorthandDate(referenceDate);

    var testDateStr1 = '1001';
    var expectedDateStr1 = "2016-10-01";
    assert.equal(dc.getDateFrom4LetterString(testDateStr1), expectedDateStr1,
        "Valid date string " + testDateStr1 + " returned " + expectedDateStr1);

    var testDateStr2 = '1201';
    var expectedDateStr2 = "2015-12-01";
    assert.equal(dc.getDateFrom4LetterString(testDateStr2), expectedDateStr2,
        "Valid date string " + testDateStr2 + " returned last year's date " + expectedDateStr2);

    var testDateStr3 = '120116';
    var expectedDateStr3 = undefined;
    assert.equal(dc.getDateFrom4LetterString(testDateStr3), expectedDateStr3,
        "Date string that is too long '" + testDateStr3 + "' returned " + expectedDateStr3);

    var testDateStr4 = '1501';
    var expectedDateStr4 = undefined;
    assert.equal(dc.getDateFrom4LetterString(testDateStr4), expectedDateStr4,
        "Date string with invalid month '" + testDateStr4 + "' returned " + expectedDateStr4);

});

