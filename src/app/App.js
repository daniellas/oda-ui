import React from 'react';
import {connect} from 'react-redux';
import reducerRegistry from './store/reducerRegistry';
import epicRegistry from './store/epicRegistry';
import epics from './epics';
import {ajax} from 'rxjs/ajax';

import _ from 'lodash';

import {createAction} from './store/actionCreators';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableHead
} from '@material-ui/core';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {restUrlBase} from "./config/config";

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

const app = ({generateCfdReport, downloadJiraData, report}) => {
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

  const [prios, setPrios] = React.useState({
    Lowest: true,
    Low: true,
    Medium: true,
    High: true,
    Highest: true,
    Critical: true
  });
  const changePrios = e => {
    const v = {...prios};

    v[e.target.value] = e.target.checked;
    setPrios(v);
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
    <Grid container spacing={5}>
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
        <Box>
          <FormControl component="fieldset">
            <FormLabel>Items: </FormLabel>
            <FormControlLabel value="Story" label="Story"
                              control={<Checkbox onChange={changeItems} checked={items.Story}/>}/>
            <FormControlLabel value="Bug" label="Bug" control={<Checkbox onChange={changeItems} checked={items.Bug}/>}/>
          </FormControl>
        </Box>
        <Box>
          <FormControl component="fieldset">
            <FormLabel>Priorities: </FormLabel>
            <FormControlLabel value="Critical" label="Critical"
                              control={<Checkbox onChange={changePrios} checked={prios.Critical}/>}/>
            <FormControlLabel value="Highest" label="Highest"
                              control={<Checkbox onChange={changePrios} checked={prios.Highest}/>}/>
            <FormControlLabel value="High" label="High"
                              control={<Checkbox onChange={changePrios} checked={prios.High}/>}/>
            <FormControlLabel value="Medium" label="Medium"
                              control={<Checkbox onChange={changePrios} checked={prios.Medium}/>}/>
            <FormControlLabel value="Low" label="Low"
                              control={<Checkbox onChange={changePrios} checked={prios.Low}/>}/>
            <FormControlLabel value="Lowest" label="Lowest"
                              control={<Checkbox onChange={changePrios} checked={prios.Lowest}/>}/>
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={() => generateCfdReport(interval, items, prios)}>
            Generate
          </Button>
          <Button variant="contained" color="primary" onClick={downloadJiraData}>
            Download data
          </Button>
        </Box>
        <Box>
          {drawChart(report)}
        </Box>
      </Grid>
      <Grid item xs={5}>
        <ResponsiveContainer width="100%" height={800}>
          <AreaChart data={report}>
            <XAxis dataKey="created"/>
            {series.todo ? <Area type="step" dataKey="To Do cumulative"/> : null}
            {series.done ? <Area type="step" dataKey="Done cumulative"/> : null}
            {series.ct ? <Area type="step" dataKey="CT"/> : null}
            {series.th ? <Area type="step" dataKey="TH"/> : null}
            <YAxis/>
            <Tooltip/>
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={5}>
        <div style={{overflow: 'auto', maxHeight: 800}}>
          <Table size="small" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Created</TableCell>
                <TableCell align="right">To Do</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">WIP</TableCell>
                <TableCell align="right">CT</TableCell>
                <TableCell align="right">TH</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                report
                  .map(r => (
                      <TableRow>
                        <TableCell align="center">{r.created}</TableCell>
                        <TableCell align="right">{r['To Do cumulative']}</TableCell>
                        <TableCell align="right">{r['Done cumulative']}</TableCell>
                        <TableCell align="right">{r['WIP cumulative']}</TableCell>
                        <TableCell align="right">{r['CT']}</TableCell>
                        <TableCell align="right">{r['TH'] ? r['TH'].toFixed(2) : null}</TableCell>
                      </TableRow>
                    )
                  )
              }
            </TableBody>
          </Table>
        </div>
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
  generateCfdReport: (interval, items, prios) => {
    const itemsParams = Object.keys(items)
      .filter(k => items[k])
      .reduce((a, i) => a + '&item=' + i, '');
    const priosParams = Object.keys(prios)
      .filter(k => prios[k])
      .reduce((a, i) => a + '&prio=' + i, '');

    ajax.get(`${restUrlBase()}/cfd?interval=${interval}${itemsParams}${priosParams}`)
      .subscribe(resp => dispatch(createAction('STORE_CFD_REPORT', resp.response)));
  },
  downloadJiraData: () => ajax.post(`${restUrlBase()}/jira/download`)
    .subscribe(resp => dispatch(createAction('JIRA_DATA_DOWNLOADED')))
});

export const App = connect(mapStateToProps, mapDispatchToProps)(app);
