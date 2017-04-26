var { ExtendedDateRange } = require('../lib/');

const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-02-01T00:00:00+00:00');
const subrange1 = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-01-02T00:00:00+00:00');
const subrange2 = new ExtendedDateRange('2017-01-02T00:00:00+00:00/2017-01-03T00:00:00+00:00');
const subrange3 = new ExtendedDateRange('2017-01-03T00:00:00+00:00/2017-01-04T00:00:00+00:00');

r.tz('UTC');
subrange1.tz('UTC');
subrange2.tz('UTC');
subrange3.tz('UTC');

// As first member of the month, the date is not simplified:
// January 1, 2017
console.log(subrange1.format(false, r));

// Second member don't need as much information, so the year is pruned from the output
// January 2
console.log(subrange2.format(false, r));
