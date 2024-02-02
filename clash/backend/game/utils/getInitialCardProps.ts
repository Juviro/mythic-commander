import db from 'backend/database/db';
import { BattlefieldCard } from 'backend/database/gamestate.types';

interface Card {
  loyalty: string;
  type_line: string;
  card_faces: {
    defense: string;
  }[];
  all_parts: {
    id: string;
    name: string;
    component: string;
    type_line: string;
  }[];
}

const getInitialCardProps = async (cardId: string): Promise<Partial<BattlefieldCard>> => {
  const card: Card = await db('cards').where({ id: cardId }).first();

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
