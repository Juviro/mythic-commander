import { UnifiedDeckCard } from 'types/unifiedTypes';
import { PARTNER_TYPES } from 'components/Elements/Shared/CommanderPicker/CommanderPicker';
import {
  CARD_TYPES,
  CARD_TYPE_DECK_ORDER,
} from '../components/Provider/CardProvider/staticTypes';

const typeMap = {
  Sorcery: 'Sorceries',
  Commander: 'Commander',
};

export const typeToPlural = (type: string) => typeMap[type] || `${type}s`;

const addMainType = (card: UnifiedDeckCard) => {
  const mainType = card.isCommander
    ? 'Commander'
    : CARD_TYPES.find((type) => card.primaryTypes.includes(type));

  return {
    ...card,
    mainType,
  };
};

export default (cards: UnifiedDeckCard[]) => {
  if (!cards) return {};

  const getCommanders = () => {
    const commanders = cards
      .filter(({ isCommander }) => isCommander)
      .sort((a) => {
        if (a.partner?.partnerType === PARTNER_TYPES.BACKGROUND_CREATURE) return -1;
        if (a.partner?.partnerType === PARTNER_TYPES.BACKGROUND_ENCHANTMENT) return 1;
        if (a.partner?.partnerType === PARTNER_TYPES.DOCTOR) return -1;
        if (a.partner?.partnerType === PARTNER_TYPES.DOCTORS_COMPANION) return 1;

        return 0;
      });
    return {
      type: 'Commander',
      cards: commanders,
    };
  };

  const cardWithMainType = cards.map(addMainType);
  const defaultTypes = CARD_TYPE_DECK_ORDER.map((type) => ({
    type: typeToPlural(type),
    cards: cardWithMainType.filter((card) => card.mainType === type),
  }));
  const commander = cards.find(({ isCommander }) => isCommander);

  const cardsByType = [getCommanders(), ...defaultTypes];

  return { cardsByType, commander };
};
