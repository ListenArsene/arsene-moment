var { ExtendedDateRange } = require('../lib/');

const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-02-01T00:00:00+00:00');

// ExtendedDateRange uses moment-timezone, so you may need to specify it
r.tz('UTC');

r.locale('fr');
// Long display
// result: janvier 2017
console.log(r.format());

r.locale('es');
// Long display
// result: enero 2017
console.log(r.format());

r.locale('zh-cn');
// Long display
// result: 一月 2017
console.log(r.format());

r.locale('th');
// Long display
// result: มกราคม 2017
console.log(r.format());
