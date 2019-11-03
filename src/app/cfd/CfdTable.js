import {Table, TableBody, TableHead} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import {connect} from 'react-redux';
import {xAxisKey} from './cfd';

const drawHeaders = series => series.map(s => <TableCell align="right" key={s.value}>{s.value}</TableCell>);
const drawDataCols = (series, data) => series
  .map(s => <TableCell align="right" key={s.value}>{data[s.value]}</TableCell>);

const CfdTable = ({data, series}) => {
  if (!data || !data.length) return null;

  return (
    <Table size="small" stickyHeader={true}>
      <TableHead>
        <TableRow>
          <TableCell align="center">{xAxisKey}</TableCell>
          {drawHeaders(series)}
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data
            .slice()
            .reverse()
            .map(r => (
                <TableRow key={r[xAxisKey]}>
                  <TableCell align="center">{r[xAxisKey]}</TableCell>
                  {drawDataCols(series, r)}
                </TableRow>
              )
            )
        }
      </TableBody>
    </Table>
  );
};

const mapStateToProps = state => ({
  data: state.cfd.data,
  series: state.cfd.series
});

export default connect(mapStateToProps)(CfdTable);