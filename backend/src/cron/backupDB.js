// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/

import { execute } from '@getvim/execute';

const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const backupDir = process.env.BACKUP_DIR ? `${process.env.BACKUP_DIR}/` : '';

const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() +
  1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `${backupDir}database-backup-${currentDate}.tar`;

const backupDB = () => {
  return new Promise((resolve, reject) => {
    execute(`pg_dump -U ${username} -d ${database} -f ${fileName}`)
      .then(async () => {
        console.info(`DB Backup to file ${fileName} completed`);
        resolve();
      })
      .catch(err => {
        console.error('Error backing up DB:', err);
        reject();
      });
  });
};

export const restore = () => {
  execute(`pg_restore -cC -d ${database} ${fileName}`)
    .then(async () => {
      console.info('Restored');
    })
    .catch(err => {
      console.error(err);
    });
};

export default backupDB;
