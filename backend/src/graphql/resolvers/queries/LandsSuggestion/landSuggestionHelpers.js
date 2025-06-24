import db from '../../../../database';
import { LAND_CYCLES } from './landCycles';

export const getLandCycleFavorites = async (userId) => {
  return db('landCycleFavorites').where('userId', userId).pluck('landCycleId');
};

export const getColorIdentity = async (deckId) => {
  const { rows: colorIdentities } = await db.raw(
    `
          SELECT color_identity
          FROM cards 
          LEFT JOIN "cardToDeck" 
              on "cardToDeck".id = cards.id
          WHERE 
              "deckId" = ?
              AND "isCommander" = true;
      `,
    [deckId]
  );
  const colorIdentity = colorIdentities
    .map(({ color_identity }) => color_identity)
    .flat();

  return [...new Set(colorIdentity)];
};

export const getCards = async (deckId) => {
  const { rows: cards } = await db.raw(
    `
    SELECT 
        "cardToDeck".amount, 
        cards.name,
        cards.mana_cost,
        cards.produced_mana,
        cards.type_line,
        cards.oracle_id,
        cards.id
    FROM cards
    LEFT JOIN "cardToDeck"
        on "cardToDeck".id = cards.id
    WHERE 
        "deckId" = ?
        `,
    [deckId]
  );

  return cards;
};

export const getLandCycles = async ({
  colorIdentity,
  ownedLandsOnly,
  userId,
  landCycleFavorites,
}) => {
  const ownedOracleIds = await db('collection')
    .leftJoin('cards', 'collection.id', 'cards.id')
    .where('userId', userId)
    .pluck('oracle_id');

  const groups = LAND_CYCLES.map((group) => {
    const filteredLands = group.lands
      .map((land) => ({
        ...land,
        owned: ownedOracleIds.includes(land.oracle_id),
      }))
      .filter((land) => {
        if (land.condition && !land.condition(colorIdentity)) {
          return false;
        }
        if (ownedLandsOnly && !land.owned) {
          return false;
        }

        return land.mainColorProduction.every((color) =>
          colorIdentity.includes(color)
        );
      });

    return {
      ...group,
      isFavorite: landCycleFavorites.includes(group.id),
      lands: filteredLands,
    };
  });

  const filteredGroups = groups.filter((group) => {
    if (group.condition && !group.condition(colorIdentity)) {
      return false;
    }

    return group.lands.length > 0;
  });

  return filteredGroups.sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1;
    }

    return 0;
  });
};

export const getGroupsWithCurrentLands = (landCycles, cards) => {
  let currentLands = cards.filter((card) =>
    card.type_line?.split('//')?.at(0)?.includes('Land')
  );

  const landCyclesWithSelected = landCycles.map((group) => {
    const landsWithSelected = group.lands.map((land) => {
      const alreadyIncluded = currentLands.find(
        (currentLand) => currentLand.oracle_id === land.oracle_id
      );

      if (alreadyIncluded) {
        currentLands = currentLands.filter(
          (currentLand) => currentLand.oracle_id !== land.oracle_id
        );
      }

      return {
        ...land,
        id: alreadyIncluded?.id || land.id,
        selected: Boolean(alreadyIncluded),
      };
    });

    return {
      ...group,
      lands: landsWithSelected,
    };
  });

  if (!currentLands.length) {
    return landCyclesWithSelected;
  }

  const currentLandsGroup = {
    name: 'Other lands already in deck',
    id: 'other-lands-already-in-deck',
    isFavorite: true,
    lands: currentLands.map((land) => ({
      ...land,
      selected: true,
    })),
  };

  return [...landCyclesWithSelected, currentLandsGroup];
};

export const getManaPipsByColor = (cards) => {
  return cards.reduce((acc, card) => {
    const { mana_cost } = card;
    const manaPips = mana_cost.replace(/[^WUBRGC]/g, '').split('');
    manaPips.forEach((pip) => {
      const currentAmount = acc[pip] ?? 0;
      acc[pip] = currentAmount + 1;
    });
    return acc;
  }, {});
};

export const getCardVersions = async (oracleIds, userId) => {
  const cardVersions = await db('defaultCardVersions')
    .whereIn('oracle_id', oracleIds)
    .andWhere('userId', userId);

  return cardVersions;
};

export const getGroupsWithDefaultCardVersions = (
  groups,
  defaultCardVersions,
  deckCards
) => {
  const currentLandIds = deckCards.filter((card) =>
    card.type_line?.split('//')?.at(0)?.includes('Land')
  );

  return groups.map((group) => {
    return {
      ...group,
      lands: group.lands.map((land) => {
        if (currentLandIds.some((card) => card.oracle_id === land.oracle_id)) {
          return land;
        }

        const defaultCardVersion = defaultCardVersions.find(
          (card) => card.oracle_id === land.oracle_id
        );
        return {
          ...land,
          id: defaultCardVersion?.id || land.id,
        };
      }),
    };
  });
};
