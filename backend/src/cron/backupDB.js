// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// For authorization on the server, see https://stackoverflow.com/questions/2893954/how-to-pass-in-password-to-pg-dump

import { execute } from '@getvim/execute';

const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const backupDir = process.env.BACKUP_DIR ? `${process.env.BACKUP_DIR}/` : '';

const pad = (num) => {
  return num < 10 ? `0${num}` : num;
};

const getFilename = () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )}-${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${backupDir}database-backup-${currentDate}.tar`;
};

const backupDB = () => {
  if (process.env.NODE_ENV === 'dev') {
    console.error('WRONG NODE_ENV FOR DB BACKUP');
    return null;
  }
  console.info(
    'Starting to backup DB',
    new Date().toLocaleString('de', { timeStyle: 'short', dateStyle: 'short' })
  );

  const fileName = getFilename();

  return new Promise((resolve, reject) => {
    try {
      execute(
        `pg_dump -U ${username} -d ${database} -f ${fileName} -T "\\"cardPrices"\\"`
      )
        .then(async () => {
          console.info(`DB Backup to file ${fileName} completed`);
          resolve();
        })
        .catch((err) => {
          console.error('Error backing up DB:', err);
          reject();
        });
    } catch (e) {
      console.error('Error executing:', e);
    }
  });
};

export const restore = () => {
  const fileName = getFilename();

  execute(`pg_restore -cC -d ${database} ${fileName}`)
    .then(async () => {
      console.info('Restored');
    })
    .catch((err) => {
      console.error(err);
    });
};

export default backupDB;
