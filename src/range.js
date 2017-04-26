import moment from 'moment';
import 'moment-timezone';
import { DateRange } from 'moment-range';
import getRangeLocale from './locales';

export const PERIOD_YEAR = 'year';
export const PERIOD_QUARTER = 'quarter';
export const PERIOD_MONTH = 'month';
export const PERIOD_DAY = 'day';
export const PERIOD_HOUR = 'hour';
export const PERIOD_MINUTE = 'minute';
export const PERIOD_SECOND = 'second';
export const PERIOD_WEEK = 'week';
export const PERIOD_ISOWEEK = 'isoweek';
export const PERIOD_SEMESTER = 'semester';

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
    if (this.diff('seconds') === 1) {
      return PERIOD_SECOND;
    }

    if (this.start.second() !== 0) {
      return null;
    }

    if (this.diff('minutes') === 1) {
      return PERIOD_MINUTE;
    }

    if (this.start.minute() !== 0) {
      return null;
    }

    if (this.diff('hours') === 1) {
      return PERIOD_HOUR;
    }

    if (this.start.hour() !== 0) {
      return null;
    }

    if (this.diff('days') === 1) {
      return PERIOD_DAY;
    }

    // note: weekday is ZERO indexed
    if (this.start.weekday() === 0 && this.diff('weeks') === 1) {
      return PERIOD_WEEK;
    }

    // note: isoweekday is ONE indexed
    if (this.start.isoWeekday() === 1 && this.diff('weeks') === 1) {
      return PERIOD_ISOWEEK;
    }

    if (this.start.date() !== 1) {
      return null;
    }

    if (this.diff('months') === 1) {
      return PERIOD_MONTH;
    }

    if (this.diff('months') === 3) {
      return PERIOD_QUARTER;
    }

    if (this.diff('months') === 6) {
      return PERIOD_SEMESTER;
    }

    if (this.diff('years') === 1) {
      return PERIOD_YEAR;
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

  format(short = false, simplify = null) {
    switch (this.humanPeriod) {
      case PERIOD_SECOND:
        return this.formatSecond(short, simplify);
      case PERIOD_MINUTE:
      case PERIOD_HOUR:
        return this.formatDateTime(short, simplify);
      case PERIOD_DAY:
        return this.formatDay(short, simplify);
      case PERIOD_WEEK:
        return this.formatWeek(short, simplify);
      case PERIOD_ISOWEEK:
        return this.formatIsoWeek(short, simplify);
      case PERIOD_MONTH:
        return this.formatMonth(short, simplify);
      case PERIOD_QUARTER:
        return this.formatQuarter(short, simplify);
      case PERIOD_SEMESTER:
        return this.formatSemester(short, simplify);
      case PERIOD_YEAR:
        return this.formatYear(short, simplify);
      default:
        return this.formatGeneric(short, simplify);
    }
  }

  /**
   * Pick a format in an array of Moment format string, depending on two factors:
   * 1- Short or long display
   * 2- Has simplify and startOf, if so output may be simplified accordingly
   *
   * @param type
   * @param short
   * @param simplify
   * @param startOf
   * @returns {*|string}
   * @private
   */
  pickFormat(type, short = false, simplify = false, startOf = 'year') {
    const locale = getRangeLocale(this.start.locale());
    const formats = locale[type] || [];
    const defaultFormat = formats[0] || short ? 'l LT' : 'LLLL';

    if (simplify instanceof DateRange && startOf) {
      const pivotDate = this.start.clone().startOf(startOf);

      if (!this.start.isSame(pivotDate) && !this.start.isSame(simplify.start)) {
        if (short) {
          return formats[2] || formats[0] || defaultFormat;
        }
        return formats[3] || formats[1] || defaultFormat;
      }
    }

    if (simplify === true) {
      if (short) {
        return formats[2] || formats[0] || defaultFormat;
      }
      return formats[3] || formats[1] || defaultFormat;
    }

    if (short) {
      return formats[0] || defaultFormat;
    }
    return formats[1] || defaultFormat;
  }

  formatGeneric(short) {
    const format = this.pickFormat('generic', short);
    return `${this.start.format(format)} - ${this.end.format(format)}`;
  }

  formatYear(short) {
    const format = this.pickFormat('year', short);
    return this.start.format(format);
  }

  formatSemester(short, simplify) {
    const semester = this.start.month() < 6 ? 1 : 2;
    const ordinalSemester = this.start.localeData().ordinal(semester);

    const format = this.pickFormat('semester', short, simplify, 'year');
    return this.start.format(format)
      .replace('__SEMESTER', semester)
      .replace('__ORDINALSEMESTER', ordinalSemester);
  }

  formatQuarter(short, simplify) {
    const format = this.pickFormat('quarter', short, simplify, 'year');
    return this.start.format(format);
  }

  formatMonth(short, simplify) {
    const format = this.pickFormat('month', short, simplify, 'year');
    return this.start.format(format);
  }

  formatWeek(short, simplify) {
    const format = this.pickFormat('week', short, simplify, 'year');
    return this.start.format(format);
  }

  formatIsoWeek(short, simplify) {
    const format = this.pickFormat('isoweek', short, simplify, 'year');
    return this.start.format(format);
  }

  formatDay(short, simplify) {
    const format = this.pickFormat('date', short, simplify, 'year');
    return this.start.format(format);
  }

  formatDateTime(short, simplify) {
    const format = this.pickFormat('datetime', short, simplify, 'day');
    return this.start.format(format);
  }

  formatSecond(short, simplify) {
    const format = this.pickFormat('datetimeSecond', short, simplify, 'day');
    return this.start.format(format);
  }
}

