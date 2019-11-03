import {ajax} from 'rxjs/ajax';
import {restUrlBase} from '../../config/config';

const downloadData = projectKey => ajax.post(`${restUrlBase()}/jira/${projectKey}/download`);
const getProjects = () => ajax.get(`${restUrlBase()}/jira/projects`);
const getConfig = projectKey => ajax.get(`${restUrlBase()}/jira/${projectKey}/config`);

export {downloadData, getProjects, getConfig};