import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);

import moment from 'moment';
import ExtendedDateRange from '../src/range';

describe('ExtendedDateRange', () => {
  beforeEach(() => {
    moment.locale('en');
  });

  it('supports locale change', () => {
    const r = new ExtendedDateRange();
    expect(r.locale()).to.equal('en');
    expect(r.start.locale()).to.equal('en');
    expect(r.end.locale()).to.equal('en');

    expect(r.locale('fr')).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.locale()).to.equal('fr');
    expect(r.start.locale()).to.equal('fr');
    expect(r.end.locale()).to.equal('fr');

    expect(r.locale('tq')).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.locale()).to.equal('fr');
    expect(r.start.locale()).to.equal('fr');
    expect(r.end.locale()).to.equal('fr');

    expect(r.locale(false)).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.locale()).to.equal('en');
    expect(r.start.locale()).to.equal('en');
    expect(r.end.locale()).to.equal('en');
  });

  it('locale has NO effect on values', () => {
    const r = new ExtendedDateRange('2017-02-28T12:34:56+00:00/2017-02-28T12:34:56+00:00');
    expect(r.start.hour()).to.equal(13);

    r.locale('en-US');
    expect(r.start.hour()).to.equal(13);

    r.locale('ja');
    expect(r.start.hour()).to.equal(13);

    // TODO: Why are we reading 13 ? while UTC time is 12 ?
  });

  it('locale has effect on literals', () => {
    const r = new ExtendedDateRange('2017-02-28T12:34:56+00:00/2017-02-28T12:34:56+00:00');
    expect(r.start.format('LLLL')).to.equal('Tuesday, February 28, 2017 1:34 PM');

    r.locale('en-US');
    expect(r.start.format('LLLL')).to.equal('Tuesday, February 28, 2017 1:34 PM');

    r.locale('ja');
    expect(r.start.format('LLLL')).to.equal('2017年2月28日 13:34 火曜日');
  });

  it('supports timezone change', () => {
    const r = new ExtendedDateRange();
    expect(r.tz()).to.be.undefined();

    expect(r.tz('America/Los_Angeles')).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.tz()).to.equal('America/Los_Angeles');
    expect(r.start.tz()).to.equal('America/Los_Angeles');
    expect(r.end.tz()).to.equal('America/Los_Angeles');

    expect(r.tz('Europe/Paris')).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.tz()).to.equal('Europe/Paris');
    expect(r.start.tz()).to.equal('Europe/Paris');
    expect(r.end.tz()).to.equal('Europe/Paris');

    expect(r.tz('Europe/Lyon')).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.tz()).to.be.undefined();
    expect(r.start.tz()).to.be.undefined();
    expect(r.end.tz()).to.be.undefined();

    expect(r.tz(false)).to.be.an.instanceOf(ExtendedDateRange);
    expect(r.tz()).to.be.undefined();
    expect(r.start.tz()).to.be.undefined();
    expect(r.end.tz()).to.be.undefined();
  });

  it('timezone has effect on values', () => {
    const r = new ExtendedDateRange('2017-02-28T12:34:56+00:00/2017-02-28T12:34:56+00:00');
    expect(r.tz()).to.be.undefined();
    expect(r.start.hour()).to.equal(13);

    r.tz('UTC');
    expect(r.start.hour()).to.equal(12);

    r.tz('Asia/Tokyo');
    expect(r.start.hour()).to.equal(21);
  });

  it('locale has NO effect on literals', () => {
    const r = new ExtendedDateRange('2017-02-28T12:34:56+00:00/2017-02-28T12:34:56+00:00');
    expect(r.start.format('LLLL')).to.equal('Tuesday, February 28, 2017 1:34 PM');

    r.tz('UTC');
    expect(r.start.format('LLLL')).to.equal('Tuesday, February 28, 2017 12:34 PM');

    r.tz('Asia/Tokyo');
    expect(r.start.format('LLLL')).to.equal('Tuesday, February 28, 2017 9:34 PM');
  });

  it('by default, humanPeriod is null', () => {
    const r = new ExtendedDateRange();
    expect(r.humanPeriod).to.be.null();

    r.tz('UTC');
    expect(r.humanPeriod).to.be.null();
  });

  it('detects a plain minute', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-01T00:01:00+00:00');
    expect(r.humanPeriod).to.equal('minute');

    r.tz('UTC');
    expect(r.humanPeriod).to.equal('minute');

    r.tz('Australia/Eucla'); // UTC +8:45
    expect(r.humanPeriod).to.equal('minute');

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.equal('minute');
  });

  it('detects a plain hour', () => {
    const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-01T01:00:00+00:00');
    expect(r.humanPeriod).to.equal('hour');

    r.tz('UTC');
    expect(r.humanPeriod).to.equal('hour');

    r.tz('Australia/Eucla'); // UTC +8:45
    expect(r.humanPeriod).to.be.null();

    r.tz('Europe/Paris'); // UTC +1:00
    expect(r.humanPeriod).to.equal('hour');
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
});
