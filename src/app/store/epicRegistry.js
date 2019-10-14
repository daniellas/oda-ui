import {epicsSubscriber} from './rootEpic';

const epicRegistry = () => ({
  register: epics => Object.keys(epics).map(key => epicsSubscriber.next(epics[key]))
});

export default epicRegistry();
