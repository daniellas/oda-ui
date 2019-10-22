import {Box, Grid} from '@material-ui/core';
import CfdIntervalSelector from './CfdIntervalSelector';
import CfdItemsSelector from './CfdItemsSelector';
import CfdPriosSelector from './CfdPriosSelector';
import CfdReportGenerator from './CfdReportGenerator';
import CfdSeriesSelector from './CfdSeriesSelector';
import CfdChart from './CfdChart';
import CfdTable from './CfdTable';
import React from 'react';
import CfdAggregateSelector from './CfdAggregateSelector';
import CfdTimeRangeSelector from './CfdTimeRangeSelector';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';

const CfdDashboard = ({data}) => {
  const [tab, setTab] = React.useState(0);
  const changeTab = (e, v) => {
    setTab(v);
  };

  const drawTabs = () => {
    if (data && data.length) {
      return (
        <Grid container item spacing={1} xs={10}>
          <Grid item xs={12}>
            <Tabs value={tab} onChange={changeTab}>
              <Tab label="Chart"/>
              <Tab label="Table"/>
            </Tabs>
            <Typography id="chart" component="div" hidden={tab !== 0}>
              <Box p={2}>
                <CfdChart width="100%" height={700}/>
              </Box>
            </Typography>
            <Typography id="table" component="div" hidden={tab !== 1}>
              <Box p={2}>
                <div style={{overflow: 'auto', maxHeight: 700}}>
                  <CfdTable/>
                </div>
              </Box>
            </Typography>
          </Grid>
        </Grid>
      );
    }

    return null;
  };

  return (
    <>
      <Grid container direction="column" item xs={2} spacing={1}>
        <Grid item>
          <CfdAggregateSelector/>
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
          <CfdTimeRangeSelector/>
        </Grid>
        <Grid item>
          <CfdReportGenerator/>
        </Grid>
        <Grid item>
          <CfdSeriesSelector/>
        </Grid>
      </Grid>
      {drawTabs()}
    </>
  );
};

const mapStateToProps = state => ({
  data: state.cfd.data
});

export default connect(mapStateToProps)(CfdDashboard);