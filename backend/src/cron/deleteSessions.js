import knex from '../database';

const deleteSessions = () => {
  knex.raw('DELETE FROM sessions WHERE expires < NOW()');
};

export default deleteSessions;
