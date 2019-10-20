import {Grid} from '@material-ui/core';
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

const CfdDashboard = () => (
  <>
    <Grid container direction="column" item xs={2} spacing={2}>
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
    <Grid container item spacing={1} xs={10}>
      <Grid item xs={6}>
        <CfdChart width="100%" height={800}/>
      </Grid>
      <Grid item xs={6}>
        <div style={{overflow: 'auto', maxHeight: 800}}>
          <CfdTable/>
        </div>
      </Grid>
    </Grid>
  </>
);

export default CfdDashboard;