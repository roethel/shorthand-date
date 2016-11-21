/**
 * Created by roethel on 11/20/16.
 */

QUnit.test( "Testing utility function checkDateString", function( assert ) {
    var testStr1 = '0112';
    assert.ok(ShorthandDate.checkDateString(testStr1, 4),
        "'" + testStr1 +"' is valid date string of length 4");

    var testStr2 = '012';
    assert.ok(!ShorthandDate.checkDateString(testStr2, 4),
        "'" + testStr2 +"' is not a valid date string of length 4");

    var testStr3 = '01A2';
    assert.ok(!ShorthandDate.checkDateString(testStr2, 4),
        "'" + testStr3 +"' containing non-numeric character is not a valid date string of length 4");

});
