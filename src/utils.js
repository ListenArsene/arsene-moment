import moment from 'moment';
import { DateRange } from 'moment-range';
import 'moment-timezone';
import ExtendedDateRange from './range';

export function isValidSupportedDate(d) {
  if (!d) {
    return false;
  }

  if (moment.isDate(d)) {
    const date = moment(d);
    return date.isValid();
  }

  if (moment.isMoment(d)) {
    return d.isValid();
  }

  if (d instanceof DateRange) {
    return d.start.isValid() && d.end.isValid();
  }

  return false;
}

export function convert(d, fallback = NaN) {
  // http://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
  // Converts the date in d to a date-object. The input can be:
  //   a date object: returned without modification
  //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
  //   a number     : Interpreted as number of milliseconds
  //                  since 1 Jan 1970 (a timestamp)
  //   a string     : Any format supported by the javascript engine, like
  //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
  //  an object     : Interpreted as an object with year, month and date
  //                  attributes.  **NOTE** month is 0-11.
  if (d === null) {
    return fallback;
  }

  if (typeof d === 'undefined') {
    return fallback;
  }

  if (d.constructor === Date) {
    return d;
  }

  if (moment.isMoment(d)) {
    return d.toDate();
  }

  if (d.constructor === Array) {
    return new Date(d[0], d[1], d[2]);
  }

  if (d.constructor === Number) {
    return new Date(d);
  }

  if (d.constructor === String) {
    return new Date(d);
  }

  if (typeof d === 'object') {
    return new Date(d.year, d.month, d.date);
  }

  return fallback;
}

export function getTimeZone() {
  if (typeof Intl === 'undefined') {
    return 'UTC';
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!tz) {
    return 'UTC';
  }
  return tz;
}


export function castMoment(d) {
  const range = ExtendedDateRange.castRange(d);
  if (range && range.start) {
    return range.start;
  }

  const m = moment(d, moment.ISO_8601, true);
  if (m.isValid()) {
    return m;
  }
  return null;
}


export function castDate(d) {
  const m = castMoment(d);
  if (m) {
    return m.toDate();
  }

  return null;
}

export function castDateOrLeaveAsIs(d) {
  return castDate(d) || d;
}
