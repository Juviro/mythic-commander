import { RelatedCards } from 'backend/database/gamestate.types';
import { InitMatchCard, Plane } from 'backend/database/matchStore.types';

const getRelatedCards = (card: InitMatchCard | Plane) => {
  const relatedCards: (RelatedCards | null)[] = card.all_parts?.map(
    ({ component, type_line, name, id }) => {
      if (id === card.id) {
        // melded cards have themselves as a part
        return null;
      }

      if (component === 'token') {
        return {
          id,
          name,
          type: 'Token',
        };
      }
      if (type_line?.startsWith('Emblem')) {
        return {
          id,
          name,
          type: 'Emblem',
        };
      }
      if (type_line === 'Dungeon') {
        return {
          id,
          name,
          type: 'Dungeon',
        };
      }
      if (component === 'meld_result') {
        return {
          id,
          name,
          type: 'Melded',
        };
      }
      if (component === 'meld_part') {
        return {
          id,
          name,
          type: 'Meld Part',
        };
      }

      return null;
    }
  );

  return relatedCards?.filter(Boolean) as RelatedCards[];
};

export default getRelatedCards;
