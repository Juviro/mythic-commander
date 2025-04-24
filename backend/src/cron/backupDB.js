// https://soshace.com/automated-postgresql-backups-with-nodejs-and-bash/
// For authorization on the server, see https://stackoverflow.com/questions/2893954/how-to-pass-in-password-to-pg-dump

import { execute } from '@getvim/execute';
import logger from '../logging/logger';
import uploadDbBackupToDrive from './uploadDbBackupToDrive';

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

const backupDB = async () => {
  if (process.env.NODE_ENV === 'dev') {
    logger.error('WRONG NODE_ENV FOR DB BACKUP');
    return null;
  }
  logger.info(
    'Starting to backup DB',
    new Date().toLocaleString('de', { timeStyle: 'short', dateStyle: 'short' })
  );

  const fileName = getFilename();

  try {
    await execute(
      `pg_dump -U ${username} -d ${database} -f ${fileName} -T "\\"cardPrices"\\"`
    );
    logger.info(`DB Backup to file ${fileName} completed`);
  } catch (err) {
    logger.error('Error backing up DB:', err);
    throw err;
  }

  logger.info('Successfully backed up DB');
  logger.info('Uploading backup to Google Drive');

  await uploadDbBackupToDrive(fileName);
  logger.info('Successfully uploaded backup to Google Drive');

  return true;
};

export const restore = () => {
  const fileName = getFilename();

  execute(`pg_restore -cC -d ${database} ${fileName}`)
    .then(async () => {
      logger.info('Restored');
    })
    .catch((err) => {
      logger.error('Error restoring database:', err);
    });
};

export default backupDB;
