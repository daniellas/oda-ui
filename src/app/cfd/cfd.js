import {ajax} from 'rxjs/ajax';
import {restUrlBase} from '../../config/config';

const intervals = {day: 'day', week: 'week'};
const aggregates = {count: 'count', sumEstimate: 'sumEstimate'};
const xAxisKey = 'Time';

const createPriosSeletion = prios => prios.reduce((a, i) => {
  a[i] = true;

  return a;
}, {});

const extractSeries = (data, entryState, finalState) => Object.keys(data[0])
  .filter(i => i !== xAxisKey)
  .map(i => ({value: i, checked: i === entryState || i === finalState}));

const selectSeries = (series, v) => series
  .map(i => ({
    value: i.value,
    checked: (i.value === v.value && v.checked) || (i.value !== v.value && i.checked)
  }));

const generateCfdReport = (project, aggregate, interval, items, prios, timeRange, entryState, finalState) => {
  const itemsParams = Object.keys(items)
    .filter(k => items[k])
    .reduce((a, i) => a + '&item=' + i, '');
  const priosParams = Object.keys(prios)
    .filter(k => prios[k])
    .reduce((a, i) => a + '&prio=' + i, '');
  const startParam = timeRange.start ? '&start=' + timeRange.start.valueOf() : '';
  const endParam = timeRange.end ? '&end=' + timeRange.end.valueOf() : '';
  const url = `${restUrlBase()}/cfd/${project}?`
    + `aggregate=${aggregate}&interval=${interval}`
    + (entryState ? `&entryState=${entryState}` : '')
    + (finalState ? `&finalState=${finalState}` : '')
    + `${itemsParams}${priosParams}${startParam}${endParam}`;

  return ajax.get(url);
};


export {
  generateCfdReport,
  intervals,
  aggregates,
  extractSeries,
  selectSeries,
  createPriosSeletion,
  xAxisKey
};