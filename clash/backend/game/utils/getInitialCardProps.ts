import db from 'backend/database/db';
import { BattlefieldCard } from 'backend/database/gamestate.types';

const getInitialCardProps = async (cardId: string): Promise<Partial<BattlefieldCard>> => {
  const card = await db('cards').where({ id: cardId }).first();

  const initialProps: Partial<BattlefieldCard> = {};

  if (card.loyalty) {
    initialProps.counters = {
      loyalty: Number(card.loyalty),
    };
  }

  if (card.type_line?.split('//')[0].includes('Saga')) {
    initialProps.counters = {
      lore: 1,
    };
  }

  if (card.card_faces?.[0].defense) {
    initialProps.counters = {
      defense: Number(card.card_faces[0].defense),
    };
  }

  return initialProps;
};

export default getInitialCardProps;
