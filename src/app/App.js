import React from 'react';
import {connect} from 'react-redux';
import reducerRegistry from './store/reducerRegistry';
import epicRegistry from './store/epicRegistry';
import epics from './epics';
import {ajax} from 'rxjs/ajax';

import _ from 'lodash';

import {createAction} from './store/actionCreators';
import {Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from '@material-ui/core';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import Checkbox from '@material-ui/core/Checkbox';

const initialState = {
  report: []
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'STORE_CFD_REPORT':
      return {report: payload};
    default:
      return state;
  }
};

const app = ({generateCfdReport, report}) => {
  const [interval, setInterval] = React.useState('day');
  const changeInterval = e => setInterval(e.target.value);

  const [series, setSeries] = React.useState({
    todo: true,
    done: true,
    ct: false,
    th: false
  });
  const changeSeries = e => {
    const v = {...series};

    v[e.target.value] = e.target.checked;
    setSeries(v);
  };

  const [items, setItems] = React.useState({
    Story: true,
    Bug: true
  });
  const changeItems = e => {
    const v = {...items};

    v[e.target.value] = e.target.checked;
    setItems(v);
  };

  const drawChart = report => {
    if (_.isEmpty(report)) {
      return null;
    }
    return (
      <FormControl component="fieldset" margin="normal">
        <FormLabel>Series: </FormLabel>
        <FormControlLabel value="todo" label="To Do"
                          control={<Checkbox onChange={changeSeries} checked={series.todo}/>}/>
        <FormControlLabel value="done" label="Done"
                          control={<Checkbox onChange={changeSeries} checked={series.done}/>}/>
        <FormControlLabel value="ct" label="Cycle time"
                          control={<Checkbox onChange={changeSeries} checked={series.ct}/>}/>
        <FormControlLabel value="th" label="Throughput"
                          control={<Checkbox onChange={changeSeries} checked={series.th}/>}/>
      </FormControl>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box>
          <FormControl component="fieldset">
            <FormLabel>Interval: </FormLabel>
            <RadioGroup name="cycle" value={interval} onChange={changeInterval}>
              <FormControlLabel value="week" label="Week" control={<Radio/>}/>
              <FormControlLabel value="day" label="Day" control={<Radio/>}/>
            </RadioGroup>
          </FormControl>
        </Box>
        <FormControl component="fieldset">
          <FormLabel>Items: </FormLabel>
          <FormControlLabel value="Story" label="Story"
                            control={<Checkbox onChange={changeItems} checked={items.Story}/>}/>
          <FormControlLabel value="Bug" label="Bug" control={<Checkbox onChange={changeItems} checked={items.Bug}/>}/>
        </FormControl>
        <Box>
          <Button variant="contained" color="primary" onClick={() => generateCfdReport(interval, items)}>
            Generate
          </Button>
        </Box>
        <Box>
          {drawChart(report)}
        </Box>
      </Grid>
      <Grid item xs={10}>
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart data={report}>
            <XAxis dataKey="created"/>
            {series.todo ? <Area type="step" dataKey="To Do cumulative"/> : null}
            {series.done ? <Area type="step" dataKey="Done cumulative"/> : null}
            {series.ct ? <Area type="step" dataKey="CT"/> : null}
            {series.th ? <Area type="step" dataKey="TH"/> : null}
            <Tooltip/>
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};

epicRegistry.register(epics);
reducerRegistry.register('cfd', reducer);

const mapStateToProps = state => ({
  report: state.cfd.report
});

const mapDispatchToProps = dispatch => ({
  generateCfdReport: (interval, items) => {
    const itemsParams = Object.keys(items)
      .filter(k => items[k])
      .reduce((a, i) => a + '&item=' + i, '');

    ajax.get(`http://localhost:8090/oda/api/cfd?interval=${interval}${itemsParams}`)
      .subscribe(resp => dispatch(createAction('STORE_CFD_REPORT', resp.response)));
  }
});

export const App = connect(mapStateToProps, mapDispatchToProps)(app);
