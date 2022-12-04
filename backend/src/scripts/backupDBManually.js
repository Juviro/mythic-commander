import backupDB from '../cron/backupDB';

const backup = async () => {
  await backupDB();
  process.exit(0);
};

backup();
