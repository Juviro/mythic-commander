import { getImageKey } from './helper';

// Mirrored from frontend/src/components/Elements/Shared/CommanderPicker/CommanderPicker.jsx
const PARTNER_TYPES = {
  PARTNER: 'PARTNER',
  PARTNER_WITH: 'PARTNER_WITH',
  FRIENDS_FOREVER: 'FRIENDS_FOREVER',
  DOCTOR: 'DOCTOR',
  DOCTORS_COMPANION: 'DOCTORS_COMPANION',
  BACKGROUND_ENCHANTMENT: 'BACKGROUND_ENCHANTMENT',
  BACKGROUND_CREATURE: 'BACKGROUND_CREATURE',
};

const getCard =
  (db) =>
  async ({ id }) => {
    const card = await db('cards').where({ id }).first();

    return card;
  };

const resolver = {
  oracleCard(card) {
    return card;
  },
  oracle_text({ oracle_text, card_faces }) {
    if (oracle_text) return oracle_text;
    if (!card_faces) return null;

    return card_faces
      .map((cardFace) => cardFace.oracle_text)
      .join('\n<cardface>\n');
  },
  prices({ prices }) {
    const usdFoil = prices.usd_foil ?? prices.usd_etched;
    return { ...prices, usd_foil: usdFoil };
  },
  priceUsd({ prices: { usd, usd_foil, usd_etched } }) {
    return usd || usd_foil || usd_etched || 0;
  },
  priceEur({ prices: { eur, eur_foil } }) {
    return eur || eur_foil || 0;
  },
  imgKey(card) {
    return getImageKey(card);
  },
  mana_cost({ mana_cost, card_faces }) {
    if (mana_cost !== null || !card_faces) return mana_cost;
    return card_faces[0].mana_cost;
  },

  isTwoFaced({ image_uris }) {
    return !image_uris;
  },

  relatedCards({ all_parts, layout }, _, { db }) {
    if (!all_parts || layout === 'token') return null;

    return Promise.all(all_parts.map(getCard(db))).then((parts) =>
      parts.filter(Boolean)
    );
  },

  colors({ colors, card_faces }) {
    if (colors !== null || !card_faces) return colors;
    return card_faces[0].colors;
  },

  partner({ oracle_text, type_line }) {
    const isBackground = type_line.endsWith('Background');
    if (isBackground) {
      return {
        partnerType: PARTNER_TYPES.BACKGROUND_ENCHANTMENT,
        partnersWith: PARTNER_TYPES.BACKGROUND_CREATURE,
      };
    }

    if (!oracle_text || !type_line || !type_line.startsWith('Legendary')) {
      return null;
    }

    const isPartnerWith = oracle_text.includes('Partner with ');
    if (isPartnerWith) {
      const partner = oracle_text
        .match(/Partner with ([\w, ]+)[(\n]+/)
        ?.at(1)
        ?.trim();
      return {
        partnerType: PARTNER_TYPES.PARTNER_WITH,
        partnersWith: partner,
      };
    }

    const isGeneralPartner =
      oracle_text.includes('Partner (You can have') ||
      oracle_text.endsWith('Partner');
    if (isGeneralPartner) {
      return {
        partnerType: PARTNER_TYPES.ALL,
        partnersWith: PARTNER_TYPES.ALL,
      };
    }

    const isFriendsForever = oracle_text.includes('Friends forever');
    if (isFriendsForever) {
      return {
        partnerType: PARTNER_TYPES.FRIENDS_FOREVER,
        partnersWith: PARTNER_TYPES.FRIENDS_FOREVER,
      };
    }

    const isBackgroundCreature = oracle_text.includes('Choose a Background');
    if (isBackgroundCreature) {
      return {
        partnerType: PARTNER_TYPES.BACKGROUND_CREATURE,
        partnersWith: PARTNER_TYPES.BACKGROUND_ENCHANTMENT,
      };
    }

    const isDoctorsCompanion =
      oracle_text.includes("Doctor's companion (You can have") ||
      oracle_text.endsWith("Doctor's companion");
    if (isDoctorsCompanion) {
      return {
        partnerType: PARTNER_TYPES.DOCTORS_COMPANION,
        partnersWith: PARTNER_TYPES.DOCTOR,
      };
    }

    const isDoctor = type_line.endsWith('Doctor');
    if (isDoctor) {
      return {
        partnerType: PARTNER_TYPES.DOCTOR,
        partnersWith: PARTNER_TYPES.DOCTORS_COMPANION,
      };
    }

    return null;
  },
  canBeCommander(card) {
    const { oracle_text, type_line } = card.card_faces?.[0] ?? card;
    if (!type_line?.startsWith('Legendary')) {
      return false;
    }

    if (oracle_text?.toLowerCase().includes('can be your commander')) {
      return true;
    }

    return Boolean(type_line.match(/Legendary.*(Creature|Vehicle|Spacecraft)/));
  },
  isModalDfcLand(card) {
    const { layout, type_line } = card;

    return (
      layout === 'modal_dfc' &&
      type_line.includes('// Land') &&
      type_line !== 'Land // Land'
    );
  },
};

export default resolver;
