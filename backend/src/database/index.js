import knex from 'knex';
import knexfile from '../../knexfile';

const env = process.env.NODE_ENV || 'development';
console.log(' process.env.NODE_ENV :', process.env.NODE_ENV);
console.log('env :', env);
const configOptions = knexfile[env];
console.log('configOptions :', configOptions);

const db = knex(configOptions);

export default db;
