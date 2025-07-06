import { CronJob } from 'cron';

import updateCards from '../cardApi/updateCards';
import deleteSessions from './deleteSessions';
import collectionSnapshot from './collectionSnapshot';
import backupDB from './backupDB';
import storeCardPrice from './storeCardPrice';
import updateSets from '../cardApi/sets/updateSets';
import deleteGameState from './deleteGameStates';
import updatePrecons from './updatePrecons';
import updateScryfallTags from '../cardApi/scryfallTags/updateScryfallTags';

const startCronjobs = () => {
  new CronJob('0 0 4 * * *', backupDB, null, true, 'Europe/Berlin');
  new CronJob('0 30 4 * * *', updatePrecons, null, true, 'Europe/Berlin');
  new CronJob('0 0 5 * * *', deleteSessions, null, true, 'Europe/Berlin');
  new CronJob('0 30 5 * * *', deleteGameState, null, true, 'Europe/Berlin');
  new CronJob('0 0 6 * * *', updateCards, null, true, 'Europe/Berlin');
  new CronJob('0 30 6 * * *', updateSets, null, true, 'Europe/Berlin');
  new CronJob('0 0 7 * * *', collectionSnapshot, null, true, 'Europe/Berlin');
  new CronJob('0 30 7 * * *', updateScryfallTags, null, true, 'Europe/Berlin');
  new CronJob('0 0 8 * * *', storeCardPrice, null, true, 'Europe/Berlin');
};
startCronjobs();
