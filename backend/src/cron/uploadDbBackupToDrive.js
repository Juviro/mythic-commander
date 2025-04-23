import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const MAX_BACKUPS = 10;

const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
const dirId = process.env.GOOGLE_DRIVE_DIR_ID;
const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY.split(
  String.raw`\n`
).join('\n');

const authorize = async () => {
  const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, SCOPES);
  await jwtClient.authorize();
  return jwtClient;
};

// filename looks like database-backup-2024.11.17-03:00.tar
const getTimestampFromFilename = (filename) => {
  const match = filename.match(
    /database-backup-(\d{4}\.\d{2}\.\d{2}-\d{2}:\d{2})\.tar/
  );
  if (!match) {
    return 0;
  }
  return match[1];
};

const getOutdatedBackups = async (drive) => {
  const files = await drive.files.list();
  return files?.data?.files
    ?.sort((a, b) => {
      return (
        getTimestampFromFilename(b.name) - getTimestampFromFilename(a.name)
      );
    })
    .slice(MAX_BACKUPS);
};

const uploadDbBackupToDrive = async (fileName) => {
  const authClient = await authorize();
  const drive = google.drive({ version: 'v3', auth: authClient });

  const outdatedBackups = await getOutdatedBackups(drive);

  if (outdatedBackups.length) {
    console.info(`Deleting ${outdatedBackups.length} outdated backup(s)`);
    const promises = outdatedBackups.map(async (file) => {
      return drive.files.delete({ fileId: file.id });
    });
    await Promise.all(promises);
    console.info('Successfully deleted outdated backup(s)');
  } else {
    console.info('No outdated backups found');
  }

  console.info('Uploading new backup to Google Drive');

  return new Promise((resolve, reject) => {
    drive.files
      .create({
        media: {
          body: fs.createReadStream(fileName),
        },
        fields: 'id',
        requestBody: {
          name: path.basename(fileName),
          parents: [dirId],
        },
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default uploadDbBackupToDrive;
