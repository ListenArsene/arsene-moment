# What
ListenArsene's datetime manipulation library, that extends Moment and MomentRange.

# Installation

## Node.js
```
npm install arsene-moment
```

# ExtendedDateRange

[Moment-Range](https://github.com/gf3/moment-range) comes with a lot of very cool features around 
 range manipulation. We found useful to store ranges instead of dates, but were kinda sad 
 when we wanted to display them.
 
 ExtendedDateRange is a subclass of DateRange that provides some nice features:
 
## Native Timezone and Locale support

```
const r = new ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-02-01T00:00:00+00:00');
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
```

## Detect human readable periods

Following time periods are supported:
* second
* minute
* hour
* day
* week (locale dependent)
* isoweek (starts on monday)
* month
* quarter
* semester
* year


```
import { ExtendedDateRange } from 'arsene-moment';

const r = ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-02-01T00:00:00+00:00');

// month
console.log(r.humanPeriod);
```

## Format human readable periods
```
import { ExtendedDateRange } from 'arsene-moment';

const r = ExtendedDateRange('2017-01-01T00:00:00+00:00/2017-02-01T00:00:00+00:00');

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
```

### Format sub range, simplification

When displaying a group of date, you may want to display complete information
only for the first element.

```
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

```

# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests. Tests can be written with ES6 (WOW!)
- `npm test:watch` - You can even re-run tests on file changes!
- `npm run cover` - Yes. You can even cover ES6 code.
- `npm run lint` - We recommend using [airbnb-config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). It's fantastic.
- `npm run test:examples` - We recommend writing examples on pure JS for better understanding module usage.
- `npm run build` - Do some magic with ES6 to create ES5 code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing you module.

# Licence

# Installation
Just clone this repo and remove `.git` folder.

