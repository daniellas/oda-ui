import {Table, TableBody, TableHead} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import {connect} from 'react-redux';

const CfdTable = ({data}) => {
  if (!data || !data.length) return null;

  return (
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
          data
            .map(r => (
                <TableRow key={r.created}>
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
  );
};

const mapStateToProps = state => ({
  data: state.cfd.data
});

export default connect(mapStateToProps)(CfdTable);