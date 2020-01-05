import { CronJob } from 'cron';
import updateCards from './updateCards';

const startCronjobs = () => {
  new CronJob('0 0 * * * *', updateCards, null, true, 'Europe/Berlin');
};

startCronjobs();
