ShorthandDate
==============


Shorthand Date is a javascript library that creates a valid ISO date string
- ymd part only, no time components - from various shorthand entries.

The library was specifically created to support transcribing billing and accounting entries
into web forms. For that reason the date completion is always backward looking since these
entries infrequently occur in the future. Backward lookup details uses a reference date.
Typically the current date is used, but custom reference dates can be used as needed.


Note: In the following <yyyy> is used as the replacement for the reference year, typically the current year,
or the year prior to that.


Features
--------
  o Supports 4 different shorthand notations for date entries.
  o Supports a full iso date entry.
  o Returns valid dates only.
  o Returns undefined if a notation cannot be resolved to a valid date.


 Supported abbreviations
 -----------------------

  o md, e.g. 13. This will translate to <yyyy>-01-03 where <yyyy> is the current year or the prior year.

  o mmd or mdd, e.g. 812. This will resolve to <yyyy>-08-12. In case the date is ambiguous, e.g. 112,
    the closest possible date to the reference date and lookign into the past is used. E.g. for a reference
    date of 2016-03-01, the value of 121 is resolved to 2016-01-21 since that is closer to the reference
    date as the other option 2015-12-01.

  o mmdd, e.g. 1015 is resolved to <yyyy>-10-15.

  o mmddyy, e.g. 101516 is resolved to 2016-10-15. Note that this is the only shorthand that supports future dates.

  o yyyy-mm-dd, e.g. 2016-01-18 is checked for being a valid date. It is not considered here
    to be a shorthand notation since it really is an iso date.

