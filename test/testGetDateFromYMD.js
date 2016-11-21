/**
 * Created by roethel on 11/20/16.
 *
 * Tests
 *   1. Create date object from valid year, month, day, e.g. 2016, 11, 05
 *   2. year < 2000 should return undefined
 *   3. year > 2020 should return undefined
 *   4. month < 0 should return undefined
 *   5. month > 11 should return undefined
 *   6. day < 1 should return undefined
 *   7. day > 31 should return undefined
 *   8. impossible date should return undefined, e.g. Feb 30 -- 2016, 1, 30
 *
 */

QUnit.test( "Testing getDateFromYMD", function( assert ) {
    var referenceDate = new Date("2016-12-15 12:10:01");
    var dc = new ShorthandDate(referenceDate);

    // 1. valid year, month, day
    var testDate = new Date(2016, 11, 05);
    assert.equal(dc.getDateFromYMD(2016, 11, 05).getDate(), testDate.getDate(),
        "valid year, month, date returned valid date object");

    // 2. year < 2000
    assert.equal(dc.getDateFromYMD(1998, 11, 05), undefined,
        "Year < 2000 returned undefined");

    // 3. year > 2020
    assert.equal(dc.getDateFromYMD(2080, 11, 05), undefined,
        "Year > 2020 returned undefined");

    // 4. month < 0
    assert.equal(dc.getDateFromYMD(2016, -1, 05), undefined,
        "Month < 0 returned undefined");

    // 5. month > 11
    assert.equal(dc.getDateFromYMD(2016, 12, 05), undefined,
        "Month > 11 returned undefined");

    // 6. day < 1
    assert.equal(dc.getDateFromYMD(2016, 11, 0), undefined,
        "Day < 1 returned undefined");

    // 7. day > 31
    assert.equal(dc.getDateFromYMD(2016, 11, 35), undefined,
        "Day > 31 returned undefined");

    // 8. impossible date
    assert.equal(dc.getDateFromYMD(2016, 1, 30), undefined,
        "Impossible date 2016, 1, 30 returned undefined");


});