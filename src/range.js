import moment from 'moment';
import { DateRange } from 'moment-range';


export default class ExtendedDateRange extends DateRange {
  constructor(start, end) {
    super(start, end);

    this.humanPeriod = this.getHumanPeriod();
  }

  locale(locale = undefined) {
    if (typeof locale === 'undefined') {
      return this.start.locale();
    }

    this.start.locale(locale);
    this.end.locale(locale);
    this.humanPeriod = this.getHumanPeriod();
    return this;
  }

  tz(zone = undefined) {
    if (typeof zone === 'undefined') {
      return this.start.tz();
    }

    this.start.tz(zone);
    this.end.tz(zone);
    this.humanPeriod = this.getHumanPeriod();
    return this;
  }

  getHumanPeriod() {
    if (this.start.second() !== 0) {
      return null;
    }

    if (this.diff('minutes') === 1) {
      return 'minute';
    }

    if (this.start.minute() !== 0) {
      return null;
    }

    if (this.diff('hours') === 1) {
      return 'hour';
    }

    if (this.start.hour() !== 0) {
      return null;
    }

    if (this.diff('days') === 1) {
      return 'day';
    }

    if (this.start.weekday() === 1 && this.diff('weeks') === 1) {
      return 'week';
    }

    if (this.start.isoWeekday() === 1 && this.diff('weeks') === 1) {
      return 'isoweek';
    }

    if (this.start.date() !== 1) {
      return null;
    }

    if (this.diff('months') === 1) {
      return 'month';
    }

    if (this.diff('months') === 3) {
      return 'quarter';
    }

    if (this.diff('months') === 6) {
      return 'semester';
    }

    if (this.diff('years') === 1) {
      return 'year';
    }

    return null;
  }

  static castRange(d) {
    if (!isNaN(d)) {
      return null;
    }

    if (typeof d === 'string') {
      const parts = d.split('/');

      // May be a DateRange
      if (parts.length === 2) {
        const start = moment(parts[0], moment.ISO_8601, true);
        if (!start.isValid()) {
          return null;
        }
        const end = moment(parts[1], moment.ISO_8601, true);
        if (!end.isValid()) {
          return null;
        }

        return new ExtendedDateRange(start, end);
      }
    }

    return null;
  }

  static castRangeOrLeaveAsIs(d) {
    return ExtendedDateRange.castRange(d) || d;
  }
}

