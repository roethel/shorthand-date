/**
 * Created by Will Roethel on 11/19/16.
 * @cwroethel.net
 *
 */

(function () {


    "use strict";


    /****
     **** Constructor
     ****
     ****/

    /*
     *  Allow the reference date to be passed in the constructor.
     *  Default usage should be
     *    var dc = new ShorthandDate();
     *
     *  For testing and setting a standard date the following can be used
     *    var dc = new ShorthandDate(new Date('2016-11-01'));
     *
     */
    function ShorthandDate(referenceDate) {
        if (referenceDate == null) {
            this.referenceDate = new Date();
        }
        else {
            this.referenceDate = referenceDate;
        }

        // set verbosity; 0 is off.
        this.verbosity = 0;
    }


    ShorthandDate.prototype.setVerbosity = function(verbosity) {
        this.verbosity = verbosity;
    };

    /****
     **** OBJECT METHODS / PROTOTYPES
     ****
     ****/

    /*
     * print()
     * Print a summary of instance data to the console log.
     */
    ShorthandDate.prototype.print = function () {
        console.log("Instance date for ShorthandDate:");
        console.log("  referenceDate: " + this.referenceDate);
    };


    /*
     * getISODate (dateString : String) : String
     *
     * Get the full ISO date string from a provided date string.
     * The date string can be the shorthand 2, 3, 4, or 6 character string
     * or any other valid date supported by JS Date().
     *
     * This method delegates the work to the individual shorthand methods.
     *
     */
    ShorthandDate.prototype.getISODate = function (dateString) {
        // Check the length of the string and call the corresponding method

        if (dateString.length == 6) {
            return this.getDateFrom6LetterString(dateString);
        }
        else if (dateString.length == 4) {
            return this.getDateFrom4LetterString(dateString);
        }
        else if (dateString.length == 3) {
            return this.getDateFrom3LetterString(dateString);
        }
        else if (dateString.length == 2) {
            return this.getDateFrom2LetterString(dateString);
        }

        // anything not matching a 10-digit iso date should also return undefined
        else if (! /^\d\d\d\d-\d\d-\d\d+$/.test(dateString)) {
            return undefined;
        }

        /*
         * try using the string to create a Date object directly
         * See  http://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
         * for a discussion of how to check of correct dates in javascript.
         */
        else {
            var newDate = new Date(dateString);

            // check the result of this attempt
            if (newDate == null) {
                console.error("Error: Cannot create JS Date from string " + dateString);
                return undefined;
            }
            if ( Object.prototype.toString.call(newDate) === "[object Date]" ) {
                // it is a date
                if (isNaN(newDate.getTime())) {
                    console.error("Error: date is not valid. dateString " + dateString);
                    return undefined;
                }
                else {
                    // date is valid
                    return newDate.toISOString().substr(0, 10);
                }
            }
            else {
                console.error("Error: Could not create JS Date object from date string "  +dateString);
                return undefined;
            }
        }
    };


    /*
     * getDateFrom6LetterString (dateString : String) : String
     *
     * Get the full ISO date string from a 6 letter string in format mmddyy
     * Returns undefined if something in the conversion failed and writes error
     * message to console.
     *
     * Note that the 6 character shorthand is the only one that allows to create
     * future dates.
     *
     */
    ShorthandDate.prototype.getDateFrom6LetterString = function (dateString) {

        // make sure the date string is 6 letters long
        if (!checkDateString(dateString, 6)) {
            return undefined;
        }


        // get month and day from string.
        // Note that month is in the range 0-11
        var month = dateString.substring(0, 2) - 1;
        var day = dateString.substring(2, 4);
        var year = '20' + dateString.substring(4, 6);


        // create date object
        var newDate = this.getDateFromYMD(year, month, day);
        if (newDate == null) {
            return undefined;
        }


        // return date string in format yyyy-mm-dd
        return newDate.toISOString().substr(0, 10);
    };


    /*
     * getDateFrom4LetterString (string : String) : String
     *
     * Get the full ISO date string from a 4 letter string in format mmdd
     * Returns undefined if something in the conversion failed and writes error
     * message to console.
     *
     */
    ShorthandDate.prototype.getDateFrom4LetterString = function (dateString) {

        // make sure the date string is 4 letters long
        if (!checkDateString(dateString, 4)) {
            return undefined;
        }


        // get month and day from string.
        // Note that month is in the range 0-11
        var year = this.referenceDate.getFullYear();
        var month = dateString.substring(0, 2) - 1;
        var day = dateString.substring(2, 4);


        // create date object
        var newDate = this.getDateFromYMD(year, month, day);
        if (newDate == null) {
            return undefined;
        }

        // if the date is in the future, subtract a year.
        if (newDate > this.referenceDate) {
            newDate.setFullYear(newDate.getFullYear() - 1);
        }

        // return date string in format yyyy-mm-dd
        return newDate.toISOString().substr(0, 10);
    };


    /*
     * getDateFrom3LetterString (string : String) : String
     *
     * Get the full ISO date string from a 3 letter string in format mNd
     * Returns undefined if something in the conversion failed and writes error
     * message to console.
     *
     * Since the middle number in the 3 character could either belong to the month or the date
     * this method tries both options and uses the option that provides a valid date object.
     * If both options can create valid dates, the date closest to the reference date will be used.
     *
     */
    ShorthandDate.prototype.getDateFrom3LetterString = function (dateString) {

        // make sure the date string is 3 letters long
        if (!checkDateString(dateString, 3)) {
            return undefined;
        }

        /*
         * There are two possible dates.
         * Try both and use the valid one.
         * If both possibilities work, then create the closest to referenceDate
         */
        var year = this.referenceDate.getFullYear();

        // option 1: mdd
        var month1 = dateString.substring(0, 1) - 1;
        var day1 = dateString.substring(1, 3);
        var newDate1 = this.getDateFromYMD(year, month1, day1);
        if (newDate1 != null && newDate1 > this.referenceDate) {
            newDate1.setFullYear(newDate1.getFullYear() - 1);
        }

        // option 2: mmd
        var month2 = dateString.substring(0, 2) - 1;
        var day2 = dateString.substring(2, 3);
        var newDate2 = this.getDateFromYMD(year, month2, day2);
        if (newDate2 != null && newDate2 > this.referenceDate) {
            newDate2.setFullYear(newDate2.getFullYear() - 1);
        }

        /*
         * check newDate1 and newDate2 and determine which is the most appropriate
         */
        if (newDate1 == null && newDate2 != null) {
            return newDate2.toISOString().substr(0, 10);
        }

        else if (newDate1 != null && newDate2 == null) {
            return newDate1.toISOString().substr(0, 10);
        }

        else if (newDate1 != null && newDate2 != null) {
            if (newDate1 > newDate2) {
                return newDate1.toISOString().substr(0, 10);
            }
            else {
                return newDate2.toISOString().substr(0, 10);
            }
        }

        else {
            return undefined;
        }
    };


    /*
     * getDateFrom2LetterString (string : String) : String
     *
     * Get the full ISO date string from a 2 letter string in format md
     * Returns undefined if something in the conversion failed and writes error
     * message to console.
     *
     *
     */
    ShorthandDate.prototype.getDateFrom2LetterString = function (dateString) {

        // make sure the date string is 3 letters long
        if (!checkDateString(dateString, 2)) {
            return undefined;
        }

        // Create date from year, month, date
        var year = this.referenceDate.getFullYear();
        var month = dateString.substring(0, 1) - 1;
        var day = dateString.substring(1, 2);

        var newDate = this.getDateFromYMD(year, month, day);

        if (newDate == null) {
            return undefined;
        }
        else if (newDate > this.referenceDate) {
            newDate.setFullYear(newDate.getFullYear() - 1);
        }

        return newDate.toISOString().substr(0, 10);
    };


    /*
     * getDateFromYMD(year, month, day) : Date
     *
     * Get a date from year, month and day. This is a wrapper around new Date()
     * and used in all getDateFrom... methods.
     * It implements checks on year, month and day ranges since we don't want to support
     * roll-overs of invalid dates into new months, e.g. Feb 30 --> March 02.
     * This would try to interpret typo's which is a bad idea in this context.
     *
     */
    ShorthandDate.prototype.getDateFromYMD = function (year, month, day) {

        // Check if year, month, day are in valid ranges
        if (year < 2000 || year > 2020) {
            this.log("Error: Invalid year " + year, 1);
            return undefined;
        }

        if (month < 0 || month > 11) {
            this.log("Error: Invalid month " + month, 1);
            return undefined;
        }

        if (day < 1 || day > 31) {
            this.log("Error: Invalid day " + day, 1);
            return undefined;
        }

        // create date object
        var newDate = new Date(year, month, day);
        if (newDate == null) {
            this.log("Error: Failed to create date object using year: " + year
                + "; month: " + month
                + "; day: " + day + ";", 1);
            return undefined;
        }

        // final check -- is month and day the same
        if (newDate.getDate() != day || newDate.getMonth() != month) {
            this.log("Error: Failed to create date object using year: " + year
                + "; month: " + month
                + "; day: " + day + "; Month or day do not match input", 1);
            return undefined;
        }
        
        return newDate;
    };


    /*
     * log (message : String) : String
     *
     * Logging function. Set the output level of log messages.
     * Just a simple wrapper around console.log
     */
    ShorthandDate.prototype.log = function (message, verbosity) {
        if (verbosity >= this.verbosity) {
            console.log(message);
        }
    };


    /****
     **** UTILITY FUNCTIONS
     ****/

    /*
     * checkDateString (length : integer) : boolean
     *
     * Check for a valid date string as input to the getDateFrom... methods.
     * The test criteria are
     *   o the string must be numeric only
     *   o the string must be have the exact length.
     */
    function checkDateString(string, length) {
        // 1. test for length
        if (string.length != length) {
            return false;
        }

        // 2. Check for numbers only
        return /^\d+$/.test(string);
    }


    /****
     **** EXPORTER
     ****/
    /*
     *    Export modules to the browser or node.js
     */

    if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports.ShorthandDate = ShorthandDate;
        module.exports.checkDateString = checkDateString;
    }

    else {
        window.ShorthandDate = ShorthandDate;
        window.ShorthandDate.checkDateString = checkDateString;
    }

})();
