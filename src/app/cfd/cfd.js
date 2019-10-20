import {ajax} from 'rxjs/ajax';
import {restUrlBase} from '../../config/config';

const intervals = {day: 'day', week: 'week'};
const aggregates = {count: 'count', sumEstimate: 'sumEstimate'};

const generateCfdReport = (aggregate, interval, items, prios, timeRange) => {
  const itemsParams = Object.keys(items)
    .filter(k => items[k])
    .reduce((a, i) => a + '&item=' + i, '');
  const priosParams = Object.keys(prios)
    .filter(k => prios[k])
    .reduce((a, i) => a + '&prio=' + i, '');
  const startParam = timeRange.start ? '&start=' + timeRange.start.valueOf() : '';
  const endParam = timeRange.end ? '&end=' + timeRange.end.valueOf() : '';

  return ajax.get(`${restUrlBase()}/cfd/CRYP?aggregate=${aggregate}&interval=${interval}${itemsParams}${priosParams}${startParam}${endParam}`);
};

export {generateCfdReport, intervals, aggregates};