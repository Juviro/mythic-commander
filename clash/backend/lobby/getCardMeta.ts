import { RelatedCards } from 'backend/database/gamestate.types';
import { InitMatchCard } from 'backend/database/matchStore';

const getCardMeta = (card: InitMatchCard) => {
  return card.all_parts
    ?.map(({ component, type_line, name, id }) => {
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

      return null;
    })
    .filter(Boolean) as RelatedCards[];
};

export default getCardMeta;
