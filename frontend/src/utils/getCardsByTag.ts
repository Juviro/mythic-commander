import { UnifiedDeckCard } from 'types/unifiedTypes';

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
    .sort((a, b) => (a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1));
};

export default getCardsByTag;
