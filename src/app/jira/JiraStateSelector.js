import Select from '@material-ui/core/Select';
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import _ from 'lodash';

const JiraStateSelector = ({minWidth, states, selectedState, onChange}) => {
  return (
    <Select value={selectedState} onChange={e => onChange(e.target.value)} autoWidth={true}
            style={{minWidth: minWidth}}>
      {states.map(i => <MenuItem value={i} key={i}>{i}</MenuItem>)}
    </Select>
  );
};
;

const mapStateToProps = state => ({
  states: _.sortBy(_.toPairs(state.jira.projectConfig.referenceFlow), p => p[1]).map(p => p[0])
});

export default connect(mapStateToProps)(JiraStateSelector);