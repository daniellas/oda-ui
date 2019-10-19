import React from 'react';
import {connect} from 'react-redux';
import {ajax} from 'rxjs/ajax';
import _ from 'lodash';
import {createAction} from './store/actionCreators';
import {Button, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Toolbar} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {restUrlBase} from './config/config';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import CfdChart from './cfd/CfdChart';
import CfdTable from './cfd/CfdTable';
import {storeCfdReport} from './cfd/actionTypes';
import reducerRegistry from './store/reducerRegistry';
import cfdReducer from './cfd/reducer';
import CfdIntervalSelector from './cfd/CfdIntervalSelector';
import CfdItemsSelector from './cfd/CfdItemsSelector';
import CfdPriosSelector from './cfd/CfdPriosSelector';
import CfdReportGenerator from './cfd/CfdReportGenerator';

const useStyles = makeStyles(theme => ({
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1
  }
}));
const app = ({generateCfdReport, downloadJiraData, report}) => {
  const classes = useStyles();
  const [interval, setInterval] = React.useState('day');
  const changeInterval = e => setInterval(e.target.value);

  const [series, setSeries] = React.useState({
    todo: true,
    done: true,
    ct: false,
    th: false,
    wip: false
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
        <FormControlLabel value="wip" label="Work in progress"
                          control={<Checkbox onChange={changeSeries} checked={series.wip}/>}/>
      </FormControl>
    );
  };

  return (
    <Container maxWidth={false}>
      <AppBar position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <div className={classes.offset}/>
      <Grid container>
        <Grid container direction="column" xs={2} spacing={1}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={downloadJiraData}>
              Download data
            </Button>
          </Grid>
          <Grid item>
            <CfdIntervalSelector/>
          </Grid>
          <Grid item>
            <CfdItemsSelector/>
          </Grid>
          <Grid item>
            <CfdPriosSelector/>
          </Grid>
          <Grid item>
            <CfdReportGenerator/>
          </Grid>
          {/*<Grid item>*/}
          {/*  {drawChart(report)}*/}
          {/*</Grid>*/}
        </Grid>
        <Grid container spacing={1} xs={10}>
          <Grid item xs={6}>
            <CfdChart width="100%" height={800} series={series}/>
          </Grid>
          <Grid item xs={6}>
            <div style={{overflow: 'auto', maxHeight: 800}}>
              <CfdTable/>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

reducerRegistry.register('cfd', cfdReducer);

const mapStateToProps = state => ({
  report: state.cfd.data
});

const mapDispatchToProps = dispatch => ({
  generateCfdReport: (interval, items, prios) => {
    const itemsParams = Object.keys(items)
      .filter(k => items[k])
      .reduce((a, i) => a + '&item=' + i, '');
    const priosParams = Object.keys(prios)
      .filter(k => prios[k])
      .reduce((a, i) => a + '&prio=' + i, '');

    ajax.get(`${restUrlBase()}/cfd/CRYP?interval=${interval}${itemsParams}${priosParams}`)
      .subscribe(resp => dispatch(createAction(storeCfdReport, resp.response)));
  },
  downloadJiraData: () => ajax.post(`${restUrlBase()}/jira/CRYP/download`)
    .subscribe(resp => dispatch(createAction('JIRA_DATA_DOWNLOADED')))
});

export const App = connect(mapStateToProps, mapDispatchToProps)(app);
