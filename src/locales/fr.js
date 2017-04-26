export default {
  generic: ['l LT', 'LLLL'],
  year: ['YY', 'YYYY'],
  semester: [
    '[S][__SEMESTER] YY', '[__ORDINALSEMESTER] [semestre] YYYY',
    '[S][__SEMESTER]', '[__ORDINALSEMESTER] [semestre]',
  ],
  quarter: [
    '[T]Q YYYY', 'Qo [trimestre] YYYY',
    '[T]Q', 'Qo [trimestre]',
  ],
  month: [
    'MMM YY', 'MMMM YYYY',
    'MMM', 'MMMM',
  ],
  week: [
    '[S]ww YY', '[Semaine] n°ww (L)',
    '[S]ww', '[Semaine] n°ww (DD/MM)',
  ],
  isoweek: [
    '[S]WW YY', '[Semaine] n°WW (L)',
    '[S]WW', '[Semaine] n°WW (DD/MM)',
  ],
  date: [
    'L', 'LL',
    'DD/MM', 'D MMMM',
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
