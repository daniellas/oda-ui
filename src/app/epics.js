import {mapTo} from 'rxjs/operators';
import {ofType} from 'redux-observable';

const generateCfdReport = action$ => action$
  .pipe(
    ofType('GENERATE_CFD_REPORT'),
    mapTo({type: 'XX'})
  );

export default {epic: generateCfdReport};