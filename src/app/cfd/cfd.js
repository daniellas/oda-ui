import {ajax} from 'rxjs/ajax';
import {restUrlBase} from '../config/config';

const generateCfdReport = (interval, items, prios) => {
  const itemsParams = Object.keys(items)
    .filter(k => items[k])
    .reduce((a, i) => a + '&item=' + i, '');
  const priosParams = Object.keys(prios)
    .filter(k => prios[k])
    .reduce((a, i) => a + '&prio=' + i, '');

  return ajax.get(`${restUrlBase()}/cfd/CRYP?interval=${interval}${itemsParams}${priosParams}`);
};

export {generateCfdReport};