import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import React from 'react';
import {connect} from 'react-redux';
import {xAxisKey} from './cfd';

const drawSeries = dataKey => (<Area type="step" dataKey={dataKey} animationDuration={200} key={dataKey}/>);

const CfdChart = ({data, series, width, height}) => {
  if (!data || !data.length) return null;

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data}>
        <XAxis dataKey={xAxisKey}/>
        {series.filter(i => i.checked).map(i => drawSeries(i.value))}
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
