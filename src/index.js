import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './app/store/store';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import {App} from './app/App';

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App/>
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById('root')
);
