import { UnifiedDeckCard } from 'types/unifiedTypes';

const getColorName = (colorKey: string) => {
  switch (colorKey) {
    case 'W':
      return 'White';
    case 'U':
      return 'Blue';
    case 'B':
      return 'Black';
    case 'R':
      return 'Red';
    case 'G':
      return 'Green';
    default:
      return 'Colorless';
  }
};

const getCardsByColor = (cards: UnifiedDeckCard[]) => {
  if (!cards) return {};

  const cardsByColor = cards.reduce(
    (acc, card: UnifiedDeckCard) => {
      if (card.primaryTypes.includes('Land')) {
        acc.Lands.push(card);
        return acc;
      }
      const colorNames = card.color_identity?.map(getColorName).join(', ');
      if (!colorNames) {
        acc.Colorless.push(card);
        return acc;
      }
      acc[colorNames] = acc[colorNames] || [];
      acc[colorNames].push(card);

      return acc;
    },
    {
      Lands: [],
      Colorless: [],
    }
  );

  if (!cardsByColor.Colorless.length) {
    delete cardsByColor.Colorless;
  }
  if (!cardsByColor.Lands.length) {
    delete cardsByColor.Lands;
  }

  cardsByColor.Lands = cardsByColor.Lands.sort((a, b) => {
    const aNrOfColors = a.color_identity?.length;
    const bNrOfColors = b.color_identity?.length;

    if (aNrOfColors !== bNrOfColors) {
      return aNrOfColors > bNrOfColors ? 1 : -1;
    }

    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });

  const cardsByColorList = Object.keys(cardsByColor).map((color) => ({
    type: color,
    cards: cardsByColor[color],
  }));

  const sortedCardsByColor = cardsByColorList.sort((a, b) => {
    if (a.type === 'Lands' || b.type === 'Lands') {
      return a.type === 'Lands' ? 1 : -1;
    }

    const getNumberOfColors = (color: string) => {
      if (color === 'Colorless') return 0;
      return color.split(',').length;
    };
    const aLength = getNumberOfColors(a.type);
    const bLength = getNumberOfColors(b.type);

    if (aLength !== bLength) {
      return aLength > bLength ? 1 : -1;
    }

    return a.type.toLowerCase() > b.type.toLowerCase() ? 1 : -1;
  });

  return { cardsByColor: sortedCardsByColor };
};

export default getCardsByColor;
