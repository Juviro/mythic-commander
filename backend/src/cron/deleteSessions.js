import knex from '../database';

const deleteSessions = async () => {
  await knex.raw('DELETE FROM sessions WHERE expires < NOW()');
};

export default deleteSessions;
