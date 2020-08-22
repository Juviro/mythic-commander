import { CARD_TYPES } from '../components/Provider/CardProvider/staticTypes';
import { UnifiedCard } from 'types/unifiedTypes';

const typeMap = {
  Sorcery: 'Sorceries',
  Commander: 'Commander',
};

const typeToPlural = (type: string) => typeMap[type] || `${type}s`;

const addMainType = (card: UnifiedCard) => {
  const mainType = card.isCommander
    ? 'Commander'
    : CARD_TYPES.find(type => card.primaryTypes.includes(type));
  return {
    ...card,
    mainType,
  };
};

export default (cards: UnifiedCard[]) => {
  if (!cards) return {};

  const cardWithMainType = cards.map(addMainType);
  const cardsByType = ['Commander', ...CARD_TYPES].map(type => ({
    type: typeToPlural(type),
    cards: cardWithMainType.filter(card => card.mainType === type),
  }));
  const commander = cards.find(({ isCommander }) => isCommander);

  return { cardsByType, commander };
};
