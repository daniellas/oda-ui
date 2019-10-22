import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import React from 'react';
import {connect} from 'react-redux';

const drawSeries = (visible, dataKey) => {
  if (visible) {
    return <Area type="step" dataKey={dataKey} animationDuration={200}/>;
  }

  return null;
};
const CfdChart = ({data, series, width, height}) => {
  if (!data || !data.length) return null;

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data}>
        <XAxis dataKey="created"/>
        {drawSeries(series.todo, 'To Do cumulative')}
        {drawSeries(series.done, 'Done cumulative')}
        {drawSeries(series.ct, 'CT')}
        {drawSeries(series.th, 'TH')}
        {drawSeries(series.wip, 'WIP cumulative')}
        <YAxis/>
        <Tooltip/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = state => ({
  data: state.cfd.data,
  series: state.cfd.series
});

export default connect(mapStateToProps)(CfdChart);
