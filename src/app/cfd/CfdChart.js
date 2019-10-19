import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import React from 'react';
import {connect} from 'react-redux';

const CfdChart = ({data, series, width, height}) => (
  <ResponsiveContainer width={width} height={height}>
    <AreaChart data={data}>
      <XAxis dataKey="created"/>
      {series.todo ? <Area type="step" dataKey="To Do cumulative"/> : null}
      {series.done ? <Area type="step" dataKey="Done cumulative"/> : null}
      {series.ct ? <Area type="step" dataKey="CT"/> : null}
      {series.th ? <Area type="step" dataKey="TH"/> : null}
      {series.wip ? <Area type="step" dataKey="WIP cumulative"/> : null}
      <YAxis/>
      <Tooltip/>
    </AreaChart>
  </ResponsiveContainer>
);

const mapStateToProps = state => ({
  data: state.cfd.data
});

export default connect(mapStateToProps)(CfdChart);
