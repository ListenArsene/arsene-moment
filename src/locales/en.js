export default {
  generic: ['l LT', 'LLLL'],
  year: ['YY', 'YYYY'],
  semester: [
    '[S][__SEMESTER] YY', '[__ORDINALSEMESTER] [semester] YYYY',
    '[S][__SEMESTER]', '[__ORDINALSEMESTER] [semester]',
  ],
  quarter: [
    '[Q]Q YYYY', 'Qo [quarter] YYYY',
    '[Q]Q', 'Qo [quarter]',
  ],
  month: [
    'MMM YY', 'MMMM YYYY',
    'MMM', 'MMMM',
  ],
  week: [
    '[W]ww YY', '[Week] #ww (L)',
    '[W]ww', '[Week] #ww (MM/DD)',
  ],
  isoweek: [
    '[W]WW YY', '[Week] #WW (L)',
    '[W]WW', '[Week] #WW (MM/DD)',
  ],
  date: [
    'L', 'LL',
    'MM/DD', 'MMMM D',
  ],
  datetime: [
    'L LT', 'LL LT',
    'LT', 'LT',
  ],
  datetimeSecond: [
    'L LTS', 'LL LTS',
    'LTS', 'LTS',
  ],
};
