/**
 * Created by roethel on 11/20/16.
 */

QUnit.test( "Testing ShorthandDate constructor", function( assert ) {
    var dc1 = new ShorthandDate(new Date());
    assert.ok(dc1 !== null, "ShorthandDate created successfully with new Date object.")
    assert.equal(dc1.referenceDate.getDate(), new Date().getDate(),
      "Reference date is today's date");

    /*
     * Create ShorthandDate with no argument. This should return today's date
     */
    var dc2 = new ShorthandDate();
    assert.ok(dc2 !== null, "ShorthandDate created successfully with no date argument.")
    assert.equal(dc2.referenceDate.getDate(), new Date().getDate(),
        "Reference date is today's date");

    /*
     * Create ShorthandDate with a fixed reference date
     */
    var testDate = new Date("2016-11-01 12:10:01");
    var dc3 = new ShorthandDate(testDate);
    assert.ok(dc3 !== null, "ShorthandDate created successfully with fixed reference date.")
    assert.equal(dc3.referenceDate, testDate,
        "Reference date is date used in constructor");
});


