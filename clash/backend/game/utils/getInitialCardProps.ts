import db from 'backend/database/db';
import { VisibleBattlefieldCard } from 'backend/database/gamestate.types';

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

const getInitialCardProps = async (
  cardId: string
): Promise<Partial<VisibleBattlefieldCard>> => {
  const card: Card = await db('cards').where({ id: cardId }).first();

  const initialProps: Partial<VisibleBattlefieldCard> = {};

  if (card.loyalty) {
    initialProps.counters = {
      Loyalty: Number(card.loyalty),
    };
  }

  if (card.type_line?.split('//')[0].includes('Saga')) {
    initialProps.counters = {
      Lore: 1,
    };
  }
  if (card.type_line?.split('//')[0].includes('Class')) {
    initialProps.counters = {
      Generic: 1,
    };
  }

  if (card.card_faces?.[0].defense) {
    initialProps.counters = {
      Defense: Number(card.card_faces[0].defense),
    };
  }

  return initialProps;
};

export default getInitialCardProps;
