import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);

import moment from 'moment';
import ExtendedDateRange from '../src/range';

describe('ExtendedDateRange.format', () => {
  beforeEach(() => {
    moment.locale('en');
  });

  // SECOND
  const second1 = '2017-01-01T00:00:00+00:00/2017-01-01T00:00:01+00:00';
  const second2 = '2017-01-01T00:00:01+00:00/2017-01-01T00:00:02+00:00';
  const secondp = '2017-01-01T00:00:00+00:00/2017-01-01T00:00:02+00:00';

  it('detects plain second', () => {
    const r = new ExtendedDateRange(second1).tz('UTC');
    expect(r.humanPeriod).to.equal('second');
  });

  it('format plain second', () => {
    const r = new ExtendedDateRange(second1).tz('UTC');
    expect(r.format(true)).to.equal('01/01/2017 12:00:00 AM');
    expect(r.format(false)).to.equal('January 1, 2017 12:00:00 AM');
  });

  it('format plain second, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(second1).tz('UTC');
    expect(r.format(true)).to.equal('01/01/2017 00:00:00');
    expect(r.format(false)).to.equal('1 janvier 2017 00:00:00');
  });

  it('format plain second, forced simplify', () => {
    const r = new ExtendedDateRange(second1).tz('UTC');
    expect(r.format(true, true)).to.equal('12:00:00 AM');
    expect(r.format(false, true)).to.equal('12:00:00 AM');
  });

  it('format plain second, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(second1).tz('UTC');
    const r2 = new ExtendedDateRange(second2).tz('UTC');
    const parent = new ExtendedDateRange(secondp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('01/01/2017 12:00:00 AM');
    expect(r2.format(true, parent)).to.equal('12:00:01 AM');
    expect(r1.format(false, parent)).to.equal('January 1, 2017 12:00:00 AM');
    expect(r2.format(false, parent)).to.equal('12:00:01 AM');
  });

  // MINUTE
  const minute1 = '2017-01-01T00:00:00+00:00/2017-01-01T00:01:00+00:00';
  const minute2 = '2017-01-01T00:01:00+00:00/2017-01-01T00:02:00+00:00';
  const minutep = '2017-01-01T00:00:00+00:00/2017-01-01T00:02:00+00:00';

  it('detects plain minute', () => {
    const r = new ExtendedDateRange(minute1).tz('UTC');
    expect(r.humanPeriod).to.equal('minute');
  });

  it('format plain minute', () => {
    const r = new ExtendedDateRange(minute1).tz('UTC');
    expect(r.format(true)).to.equal('01/01/2017 12:00 AM');
    expect(r.format(false)).to.equal('January 1, 2017 12:00 AM');
  });

  it('format plain minute, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(minute1).tz('UTC');
    expect(r.format(true)).to.equal('01/01/2017 00:00');
    expect(r.format(false)).to.equal('1 janvier 2017 00:00');
  });

  it('format plain minute, forced simplify', () => {
    const r = new ExtendedDateRange(minute1).tz('UTC');
    expect(r.format(true, true)).to.equal('12:00 AM');
    expect(r.format(false, true)).to.equal('12:00 AM');
  });

  it('format plain minute, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(minute1).tz('UTC');
    const r2 = new ExtendedDateRange(minute2).tz('UTC');
    const parent = new ExtendedDateRange(minutep);

    expect(r1.format(true, parent)).to.equal('01/01/2017 12:00 AM');
    expect(r2.format(true, parent)).to.equal('12:01 AM');
    expect(r1.format(false, parent)).to.equal('January 1, 2017 12:00 AM');
    expect(r2.format(false, parent)).to.equal('12:01 AM');
  });

  // HOUR
  const hour1 = '2017-01-01T00:00:00+00:00/2017-01-01T01:00:00+00:00';
  const hour2 = '2017-01-01T01:00:00+00:00/2017-01-01T02:00:00+00:00';
  const hourp = '2017-01-01T00:00:00+00:00/2017-01-01T02:00:00+00:00';

  it('detects plain hour', () => {
    const r = new ExtendedDateRange(hour1).tz('UTC');
    expect(r.humanPeriod).to.equal('hour');
  });

  it('format plain hour', () => {
    const r = new ExtendedDateRange(hour1).tz('UTC');
    expect(r.format(true)).to.equal('01/01/2017 12:00 AM');
    expect(r.format(false)).to.equal('January 1, 2017 12:00 AM');
  });

  it('format plain hour, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(hour1).tz('UTC');
    expect(r.format(true)).to.equal('01/01/2017 00:00');
    expect(r.format(false)).to.equal('1 janvier 2017 00:00');
  });

  it('format plain hour, forced simplify', () => {
    const r = new ExtendedDateRange(hour1).tz('UTC');
    expect(r.format(true, true)).to.equal('12:00 AM');
    expect(r.format(false, true)).to.equal('12:00 AM');
  });

  it('format plain hour, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(hour1).tz('UTC');
    const r2 = new ExtendedDateRange(hour2).tz('UTC');
    const parent = new ExtendedDateRange(hourp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('01/01/2017 12:00 AM');
    expect(r2.format(true, parent)).to.equal('1:00 AM');
    expect(r1.format(false, parent)).to.equal('January 1, 2017 12:00 AM');
    expect(r2.format(false, parent)).to.equal('1:00 AM');
  });

  // DAY
  const day1 = '2017-10-01T00:00:00+00:00/2017-10-02T00:00:00+00:00';
  const day2 = '2017-10-02T00:00:00+00:00/2017-10-03T00:00:00+00:00';
  const dayp = '2017-10-01T00:00:00+00:00/2017-10-03T00:00:00+00:00';

  it('detects plain day', () => {
    const r = new ExtendedDateRange(day1).tz('UTC');
    expect(r.humanPeriod).to.equal('day');
  });

  it('format plain day', () => {
    const r = new ExtendedDateRange(day1).tz('UTC');
    expect(r.format(true)).to.equal('10/01/2017');
    expect(r.format(false)).to.equal('October 1, 2017');
  });

  it('format plain day, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(day1).tz('UTC');
    expect(r.format(true)).to.equal('01/10/2017');
    expect(r.format(false)).to.equal('1 octobre 2017');
  });

  it('format plain day, forced simplify', () => {
    const r = new ExtendedDateRange(day1).tz('UTC');
    expect(r.format(true, true)).to.equal('10/01');
    expect(r.format(false, true)).to.equal('October 1');
  });

  it('format plain day, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(day1).tz('UTC');
    const r2 = new ExtendedDateRange(day2).tz('UTC');
    const parent = new ExtendedDateRange(dayp).tz('UTC');

    // expect(r1.format(true, parent)).to.equal('10/01/2017');
    expect(r2.format(true, parent)).to.equal('10/02');
    // expect(r1.format(false, parent)).to.equal('October 1, 2017');
    // expect(r2.format(false, parent)).to.equal('October 2');
  });

  // WEEK
  const week1 = '2017-10-01T00:00:00+00:00/2017-10-08T00:00:00+00:00';
  const week2 = '2017-10-08T00:00:00+00:00/2017-10-15T00:00:00+00:00';
  const weekp = '2017-10-01T00:00:00+00:00/2017-10-15T00:00:00+00:00';

  it('detects plain week', () => {
    const r = new ExtendedDateRange(week1).tz('UTC');
    expect(r.humanPeriod).to.equal('week');
  });

  it('format plain week', () => {
    const r = new ExtendedDateRange(week1).tz('UTC');
    expect(r.format(true)).to.equal('W40 17');
    expect(r.format(false)).to.equal('Week #40 (10/01/2017)');
  });

  it('format plain week, localized', () => {
    // Week relies on LOCALE to be computed, applicable only to en-US
    moment.locale('fr');
    const r = new ExtendedDateRange(week1).tz('UTC');
    expect(r.format(true)).to.equal('1/10/2017 00:00 - 8/10/2017 00:00');
    expect(r.format(false)).to.equal('dimanche 1 octobre 2017 00:00 - dimanche 8 octobre 2017 00:00');
  });

  it('format plain week, forced simplify', () => {
    const r = new ExtendedDateRange(week1).tz('UTC');
    expect(r.format(true, true)).to.equal('W40');
    expect(r.format(false, true)).to.equal('Week #40 (10/01)');
  });

  it('format plain week, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(week1).tz('UTC');
    const r2 = new ExtendedDateRange(week2).tz('UTC');
    const parent = new ExtendedDateRange(weekp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('W40 17');
    expect(r2.format(true, parent)).to.equal('W41');
    expect(r1.format(false, parent)).to.equal('Week #40 (10/01/2017)');
    expect(r2.format(false, parent)).to.equal('Week #41 (10/08)');
  });

  // ISOWEEK
  const isoweek1 = '2017-10-02T00:00:00+00:00/2017-10-09T00:00:00+00:00';
  const isoweek2 = '2017-10-09T00:00:00+00:00/2017-10-16T00:00:00+00:00';
  const isoweekp = '2017-10-02T00:00:00+00:00/2017-10-16T00:00:00+00:00';

  it('detects plain isoweek', () => {
    const r = new ExtendedDateRange(isoweek1).tz('UTC');
    expect(r.humanPeriod).to.equal('isoweek');
  });

  it('format plain isoweek', () => {
    const r = new ExtendedDateRange(isoweek1).tz('UTC');
    expect(r.humanPeriod).to.equal('isoweek');
    expect(r.format(true)).to.equal('W40 17');
    expect(r.format(false)).to.equal('Week #40 (10/02/2017)');
  });

  it('format plain isoweek, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(isoweek1).tz('UTC');
    expect(r.format(true)).to.equal('S40 17');
    expect(r.format(false)).to.equal('Semaine n°40 (02/10/2017)');
  });

  it('format plain isoweek, forced simplify', () => {
    const r = new ExtendedDateRange(isoweek1).tz('UTC');
    expect(r.format(true, true)).to.equal('W40');
    expect(r.format(false, true)).to.equal('Week #40 (10/02)');
  });

  it('format plain isoweek, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(isoweek1).tz('UTC');
    const r2 = new ExtendedDateRange(isoweek2).tz('UTC');
    const parent = new ExtendedDateRange(isoweekp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('W40 17');
    expect(r2.format(true, parent)).to.equal('W41');
    expect(r1.format(false, parent)).to.equal('Week #40 (10/02/2017)');
    expect(r2.format(false, parent)).to.equal('Week #41 (10/09)');
  });

  // MONTH
  const month1 = '2017-10-01T00:00:00+00:00/2017-11-01T00:00:00+00:00';
  const month2 = '2017-11-01T00:00:00+00:00/2017-12-01T00:00:00+00:00';
  const monthp = '2017-10-01T00:00:00+00:00/2017-12-01T00:00:00+00:00';

  it('detects plain month', () => {
    const r = new ExtendedDateRange(month1).tz('UTC');
    expect(r.humanPeriod).to.equal('month');
  });

  it('format plain month', () => {
    const r = new ExtendedDateRange(month1).tz('UTC');
    expect(r.format(true)).to.equal('Oct 17');
    expect(r.format(false)).to.equal('October 2017');
  });

  it('format plain month, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(month1).tz('UTC');
    expect(r.format(true)).to.equal('oct. 17');
    expect(r.format(false)).to.equal('octobre 2017');
  });

  it('format plain month, forced simplify', () => {
    const r = new ExtendedDateRange(month1).tz('UTC');
    expect(r.format(true, true)).to.equal('Oct');
    expect(r.format(false, true)).to.equal('October');
  });

  it('format plain month, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(month1).tz('UTC');
    const r2 = new ExtendedDateRange(month2).tz('UTC');
    const parent = new ExtendedDateRange(monthp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('Oct 17');
    expect(r2.format(true, parent)).to.equal('Nov');
    expect(r1.format(false, parent)).to.equal('October 2017');
    expect(r2.format(false, parent)).to.equal('November');
  });

  // QUARTER
  const quarter1 = '2017-01-01T00:00:00+00:00/2017-04-01T00:00:00+00:00';
  const quarter2 = '2017-04-01T00:00:00+00:00/2017-07-01T00:00:00+00:00';
  const quarterp = '2017-01-01T00:00:00+00:00/2017-07-01T00:00:00+00:00';

  it('detects plain quarter', () => {
    const r = new ExtendedDateRange(quarter1).tz('UTC');
    expect(r.humanPeriod).to.equal('quarter');
  });

  it('format plain quarter', () => {
    const r = new ExtendedDateRange(quarter1).tz('UTC');
    expect(r.format(true)).to.equal('Q1 2017');
    expect(r.format(false)).to.equal('1st quarter 2017');
  });

  it('format plain quarter, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(quarter1).tz('UTC');
    expect(r.format(true)).to.equal('T1 2017');
    expect(r.format(false)).to.equal('1er trimestre 2017');
  });

  it('format plain quarter, forced simplify', () => {
    const r = new ExtendedDateRange(quarter1).tz('UTC');
    expect(r.format(true, true)).to.equal('Q1');
    expect(r.format(false, true)).to.equal('1st quarter');
  });

  it('format plain quarter, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(quarter1).tz('UTC');
    const r2 = new ExtendedDateRange(quarter2).tz('UTC');
    const parent = new ExtendedDateRange(quarterp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('Q1 2017');
    expect(r2.format(true, parent)).to.equal('Q2');
    expect(r1.format(false, parent)).to.equal('1st quarter 2017');
    expect(r2.format(false, parent)).to.equal('2nd quarter');
  });

  // SEMESTER
  const semester1 = '2017-01-01T00:00:00+00:00/2017-07-01T00:00:00+00:00';
  const semester2 = '2017-07-01T00:00:00+00:00/2018-01-01T00:00:00+00:00';
  const semesterp = '2017-01-01T00:00:00+00:00/2018-01-01T00:00:00+00:00';

  it('detects plain semester', () => {
    const r = new ExtendedDateRange(semester1).tz('UTC');
    expect(r.humanPeriod).to.equal('semester');
  });

  it('format plain semester', () => {
    const r = new ExtendedDateRange(semester1).tz('UTC');
    expect(r.format(true)).to.equal('S1 17');
    expect(r.format(false)).to.equal('1st semester 2017');
  });

  it('format plain semester, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(semester1).tz('UTC');
    expect(r.format(true)).to.equal('S1 17');
    expect(r.format(false)).to.equal('1er semestre 2017');
  });

  it('format plain semester, forced simplify', () => {
    const r = new ExtendedDateRange(semester1).tz('UTC');
    expect(r.format(true, true)).to.equal('S1');
    expect(r.format(false, true)).to.equal('1st semester');
  });


  it('format plain semester, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(semester1).tz('UTC');
    const r2 = new ExtendedDateRange(semester2).tz('UTC');
    const parent = new ExtendedDateRange(semesterp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('S1 17');
    expect(r2.format(true, parent)).to.equal('S2');
    expect(r1.format(false, parent)).to.equal('1st semester 2017');
    expect(r2.format(false, parent)).to.equal('2nd semester');
  });

  // YEAR
  const year1 = '2017-01-01T00:00:00+00:00/2018-01-01T00:00:00+00:00';
  const year2 = '2018-01-01T00:00:00+00:00/2019-01-01T00:00:00+00:00';
  const yearp = '2017-01-01T00:00:00+00:00/2019-01-01T00:00:00+00:00';

  it('detects plain year', () => {
    const r = new ExtendedDateRange(year1).tz('UTC');
    expect(r.humanPeriod).to.equal('year');
  });

  it('format plain year', () => {
    const r = new ExtendedDateRange(year1).tz('UTC');
    expect(r.format(true)).to.equal('17');
    expect(r.format(false)).to.equal('2017');
  });

  it('format plain year, localized', () => {
    moment.locale('fr');
    const r = new ExtendedDateRange(year1).tz('UTC');
    expect(r.format(true)).to.equal('17');
    expect(r.format(false)).to.equal('2017');
  });

  it('format plain year, forced simplify', () => {
    const r = new ExtendedDateRange(year1).tz('UTC');
    expect(r.format(true, true)).to.equal('17');
    expect(r.format(false, true)).to.equal('2017');
  });


  it('format plain year, simplify through parent period', () => {
    const r1 = new ExtendedDateRange(year1).tz('UTC');
    const r2 = new ExtendedDateRange(year2).tz('UTC');
    const parent = new ExtendedDateRange(yearp).tz('UTC');

    expect(r1.format(true, parent)).to.equal('17');
    expect(r2.format(true, parent)).to.equal('18');
    expect(r1.format(false, parent)).to.equal('2017');
    expect(r2.format(false, parent)).to.equal('2018');
  });



/*
  it('format plain minute', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-01T00:01:00+00:00');
    expect(r.format(true)).to.equal('1:00 AM');

    r.locale('fr');
    expect(r.format(true)).to.equal('01:00');
  });

  it('format plain minute, simplify through parent period', () => {
    const r1 = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-01T00:01:00+00:00');
    const r2 = new ExtendedDateRange('2017-01-01T00:01:00+00:00/2017-01-01T00:02:00+00:00');
    const parent = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-05-01T00:02:00+00:00');

    expect(r1.format(true, parent)).to.equal('01/01/2017 1:00 AM');
    expect(r2.format(true, parent)).to.equal('1:01 AM');

    r1.locale('fr');
    r2.locale('fr');
    expect(r1.format(true, parent)).to.equal('01/01/2017 01:00');
    expect(r2.format(true, parent)).to.equal('01:01');
  });

  it('format a plain hour', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-01T01:00:00+00:00');
    expect(r.format(true)).to.equal('1:00 AM');

    r.locale('fr');
    expect(r.format(true)).to.equal('01:00');
  });

  it('detects a plain day', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-02T00:00:00+00:00');
    expect(r.humanPeriod).to.be.null();

    r.tz('UTC');
    expect(r.humanPeriod).to.equal('day');

    r.tz('Australia/Eucla'); // UTC +8:45
    r.locale('en-au');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.be.null();

    r.locale('fr');
    expect(r.humanPeriod).to.be.null();
  });

  it('detects a plain week', () => {
    const r = new ExtendedDateRange('2017-01-02T00:00:00+01:00/2017-01-09T00:00:00+01:00');
    expect(r.humanPeriod).to.be.equal('week');

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();

    r.tz('Australia/Eucla'); // UTC +8:45
    r.locale('en-au');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.be.equal('isoweek');

    r.locale('fr');
    expect(r.humanPeriod).to.be.equal('isoweek');

    r.locale('en-US');
    expect(r.humanPeriod).to.be.equal('week');
  });

  it('detects a plain month', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+01:00/2017-02-01T00:00:00+01:00');
    expect(r.humanPeriod).to.equal('month');

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();

    r.tz('Australia/Eucla'); // UTC +8:45
    r.locale('en-au');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.equal('month');

    r.locale('fr');
    expect(r.humanPeriod).to.equal('month');
  });

  it('detects a plain quarter', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+01:00/2017-04-01T00:00:00+01:00');
    expect(r.humanPeriod).to.equal('quarter');

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();

    r.tz('Australia/Eucla'); // UTC +8:45
    r.locale('en-au');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.equal('quarter');

    r.locale('fr');
    expect(r.humanPeriod).to.equal('quarter');
  });

  it('detects a plain semester', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+01:00/2017-07-01T00:00:00+01:00');
    expect(r.humanPeriod).to.equal('semester');

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();

    r.tz('Australia/Eucla'); // UTC +8:45
    r.locale('en-au');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.equal('semester');

    r.locale('fr');
    expect(r.humanPeriod).to.equal('semester');
  });

  it('detects a plain year', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+01:00/2018-01-01T00:00:00+01:00');
    expect(r.humanPeriod).to.equal('year');

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();

    r.tz('Australia/Eucla'); // UTC +8:45
    r.locale('en-au');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.equal('year');

    r.locale('fr');
    expect(r.humanPeriod).to.equal('year');
  });

  it('supports DST switches and display stuff properly', () => {
    const r = new ExtendedDateRange('2017-03-01T00:00:00+01:00/2017-04-01T00:00:00+02:00');
    expect(r.humanPeriod).to.equal('month');

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    r.locale('fr');
    expect(r.humanPeriod).to.equal('month');
  });
});

describe('CastRange', () => {
  it('support a smart parser for dates and date ranges', () => {
    expect(ExtendedDateRange.castRangeOrLeaveAsIs('foo')).to.equal('foo');
    expect(ExtendedDateRange.castRangeOrLeaveAsIs(5)).to.equal(5);
    expect(ExtendedDateRange.castRangeOrLeaveAsIs(5.122)).to.equal(5.122);
    expect(ExtendedDateRange.castRangeOrLeaveAsIs('20161001')).to.equal('20161001');
    expect(ExtendedDateRange.castRangeOrLeaveAsIs('10')).to.equal('10');
  });

  it('support smart parse for ranges', () => {
    const validRange = ExtendedDateRange.castRangeOrLeaveAsIs('2016-01-01T00:00:00Z/2016-01-01T01:00:00Z');
    expect(moment.isMoment(validRange.start)).to.be.true();
    expect(validRange.start.isSame('2016-01-01T00:00:00Z'));
    expect(moment.isMoment(validRange.end)).to.be.true();
    expect(validRange.end.isSame('2016-01-01T01:00:00Z'));
    expect(validRange.diff()).to.equal(3600000);
  });

  it('doesnot support cast to range from date', () => {
    let validDate = ExtendedDateRange.castRangeOrLeaveAsIs('2016-01-01T00:00:00Z');
    expect(moment.isMoment(validDate)).to.be.false();

    validDate = ExtendedDateRange.castRangeOrLeaveAsIs('2016-01-01');
    expect(moment.isMoment(validDate)).to.be.false();

    validDate = ExtendedDateRange.castRangeOrLeaveAsIs('2016-01-01T00:00:00');
    expect(moment.isMoment(validDate)).to.be.false();
  });

  it('strictly uses ISO8601 strings, hence similar format are ignored.', () => {
    let validDate = ExtendedDateRange.castRangeOrLeaveAsIs('2016-01-01 00:00:00');
    expect(moment.isMoment(validDate)).to.be.false();

    validDate = ExtendedDateRange.castRangeOrLeaveAsIs('2016-31-12');
    expect(moment.isMoment(validDate)).to.be.false();
  });

  it('cast to range', () => {
    const r = ExtendedDateRange.castRange('2016-05-31T22:00:00+00:00/2016-06-30T22:00:00+00:00');

    expect(r).to.be.an.instanceof(ExtendedDateRange);
  });
  */
});
