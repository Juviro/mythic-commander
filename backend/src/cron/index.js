import { CronJob } from 'cron';

import updateCards from '../cardApi/updateCards';
import deleteSessions from './deleteSessions';
import collectionSnapshot from './collectionSnapshot';
import backupDB from './backupDB';
import storeCardPrice from './storeCardPrice';

const startCronjobs = () => {
  new CronJob('0 0 4 * * *', backupDB, null, true, 'Europe/Berlin');
  new CronJob('0 0 5 * * *', deleteSessions, null, true, 'Europe/Berlin');
  new CronJob('0 0 6 * * *', updateCards, null, true, 'Europe/Berlin');
  new CronJob('0 0 7 * * *', collectionSnapshot, null, true, 'Europe/Berlin');
  new CronJob('0 0 8 * * *', storeCardPrice, null, true, 'Europe/Berlin');
};
startCronjobs();
