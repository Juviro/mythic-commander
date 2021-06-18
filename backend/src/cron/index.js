import { CronJob } from 'cron';

import updateCards from '../cardApi/updateCards';
import deleteSessions from './deleteSessions';
import collectionSnapshot from './collectionSnapshot';

const startCronjobs = () => {
  new CronJob('0 0 5 * * *', deleteSessions, null, true, 'Europe/Berlin');
  new CronJob('0 2 14 * * *', updateCards, null, true, 'Europe/Berlin');
  new CronJob('0 0 7 * * *', collectionSnapshot, null, true, 'Europe/Berlin');
};
startCronjobs();
