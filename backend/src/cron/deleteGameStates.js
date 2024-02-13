import knex from '../database';

const deleteGameState = async () => {
  await knex.raw(
    `DELETE FROM "gameStates" WHERE to_date("lastUpdate"::TEXT,'YYYY-MM-DD') < NOW() - INTERVAL '60 days';`
  );
};

export default deleteGameState;
