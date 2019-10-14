import {createStore} from 'redux';
import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import middleware, {epicMiddleware} from './middleware';

const initialState = {};

const store = createStore(rootReducer(initialState), middleware);

epicMiddleware.run(rootEpic);

export default store;
