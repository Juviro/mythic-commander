import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

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

const uploadDbBackupToDrive = async (fileName) => {
  const authClient = await authorize();
  const drive = google.drive({ version: 'v3', auth: authClient });

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
