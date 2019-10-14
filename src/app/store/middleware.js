import {applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';

const isProduction = process.env.NODE_ENV === 'production';
const middlewares = [];

export const epicMiddleware = createEpicMiddleware();

middlewares.push(epicMiddleware);
middlewares.push(thunk);

if (!isProduction) middlewares.push(createLogger({collapsed: true}));

const middleware = composeWithDevTools(applyMiddleware(...middlewares));

export default middleware;
