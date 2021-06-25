import { execute } from '@getvim/execute';

const username = process.env.DB_USERNAME;
const database = process.env.DB_NAME;
const date = new Date();
const currentDate = `${date.getFullYear()}.${date.getMonth() +
  1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
const fileName = `database-backup-${currentDate}.tar`;

const backup = () => {
  execute(`pg_dump -U ${username} -d ${database} -f ${fileName} -F t`)
    .then(async () => {
      console.log('Finito');
    })
    .catch(err => {
      console.log(err);
    });
};

backup();
