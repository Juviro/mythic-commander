export const up = async (knex) => {
  await knex.raw(`
        ALTER TABLE "cardToWantsList" ADD CONSTRAINT "cardToWantsList_cardId_fkey" FOREIGN KEY (id) REFERENCES cards (id) ON DELETE CASCADE;
    `);
};

export const down = async (knex) => {
  await knex.raw(`
        ALTER TABLE "cardToWantsList" DROP CONSTRAINT "cardToWantsList_cardId_fkey";
    `);
};
