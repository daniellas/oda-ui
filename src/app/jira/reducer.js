import {selectJiraProject, storeJiraProjectConfig, storeJiraProjects} from './actionTypes';

const initialState = {
  projects: [],
  selectedProject: '',
  projectConfig: {
    prios: [],
    referenceFlow: {}
  }
};

const jiraReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case storeJiraProjects:
      return {...state, projects: payload};
    case selectJiraProject:
      return {...state, selectedProject: payload};
    case storeJiraProjectConfig:
      return {...state, projectConfig: payload};
    default:
      return state;
  }
};

export default jiraReducer;
