import {combineReducers} from 'redux';
import _ from 'lodash';

import reducerRegistry from './reducerRegistry';
import store from './store';

const nilReducer = (state = {}) => state;
const rootReducer = () => combineReducers(_.isEmpty(reducerRegistry.getReducers()) ? {nil: nilReducer} : reducerRegistry.getReducers());

reducerRegistry.setChangeListener(reducers => {
  store.replaceReducer(combineReducers(reducers));
});

export default rootReducer;
