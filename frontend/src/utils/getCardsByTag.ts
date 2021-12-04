import { UnifiedDeckCard } from 'types/unifiedTypes';
import DEFAULT_TAGS from 'constants/tags';

const getCardsByTag = (cards: UnifiedDeckCard[]) => {
  const cardsByType = cards.reduce((cardsByTag, card) => {
    const copy = { ...cardsByTag };

    if (card.tags?.length) {
      card.tags.forEach((tag) => {
        copy[tag] = copy[tag] ? copy[tag].concat(card) : [card];
      });
    } else {
      // @ts-ignore
      copy.Untagged = copy.Untagged ? copy.Untagged.concat(card) : [card];
    }

    return copy;
  }, {});

  return Object.entries(cardsByType)
    .reduce((acc, [key, value]) => {
      return acc.concat({ type: key, cards: value });
    }, [])
    .sort((a, b) => {
      const isDefaultTag = ({ type }) => DEFAULT_TAGS.includes(type);

      if (isDefaultTag(a) !== isDefaultTag(b)) {
        return isDefaultTag(a) ? -1 : 1;
      }

      return a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1;
    });
};

export default getCardsByTag;
