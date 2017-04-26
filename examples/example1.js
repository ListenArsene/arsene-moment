var { ExtendedDateRange } = require('../lib/');

const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-02-01T00:00:00+00:00');

// ExtendedDateRange uses moment-timezone, so you may need to specify it
r.tz('UTC');
console.log(r.humanPeriod);

// Long display
// result: January 2017
console.log(r.format());

// Short display
// result: Jan 17
console.log(r.format(true));

// Long display, simplified
// result: January
console.log(r.format(false, true));

// Short display, simplified
// result: Jan
console.log(r.format(true, true));

