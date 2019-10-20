import {ajax} from 'rxjs/ajax';
import {restUrlBase} from '../../config/config';

const downloadJiraData = projectKey => ajax.post(`${restUrlBase()}/jira/${projectKey}/download`);

export {downloadJiraData};