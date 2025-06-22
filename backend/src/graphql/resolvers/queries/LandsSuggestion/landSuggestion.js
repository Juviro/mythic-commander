/**
 * Constructs an optimized mana base for a Commander (EDH) deck.
 * @param {object} inputs - The input data for building the mana base.
 * @param {number} inputs.numberOfLands - The total count of lands the final mana base should contain.
 * @param {number} inputs.minNumberOfBasics - The minimum required amount of each basic land type.
 * @param {string[]} inputs.colorIdentity - An array of strings representing the deck's colors (e.g., ["B", "G", "U"]).
 * @param {object} inputs.manaSymbolCount - A JSON object detailing the number of mana symbols for each color.
 * @param {object[]} inputs.groups - A JSON array containing groups of available lands.
 * @returns {object[]} A JSON array of land objects with `id` and `amount` properties.
 */
const createManaBase = ({
  numberOfLands,
  minNumberOfBasics,
  colorIdentity,
  manaSymbolCount,
  groups,
}) => {
  // == Step 1: Initial Calculation & Setup ==

  let remainingLands = numberOfLands;
  const finalSelection = [];

  // Create a quick-lookup map of all land data by their ID.
  // Also enrich each land with group properties like tier and isFavorite for easier sorting.
  const allLandsById = new Map();
  const allFlattenedLands = groups
    .flatMap((group) => {
      return group.lands.map((land) => {
        const enrichedLand = {
          ...land,
          tier: group.tier,
          isFavorite: group.isFavorite || false,
          groupId: group.id,
        };
        allLandsById.set(land.id, enrichedLand);
        return enrichedLand;
      });
    })
    .filter((land) => land.autoSelect !== false);

  // Calculate target color proportions
  const totalColoredSymbols = colorIdentity.reduce(
    (sum, color) => sum + (manaSymbolCount[color] || 0),
    0
  );
  const targetProportions = {};
  if (totalColoredSymbols > 0) {
    for (const color of colorIdentity) {
      targetProportions[color] =
        (manaSymbolCount[color] || 0) / totalColoredSymbols;
    }
  }

  const basicLandInfo = {};
  allFlattenedLands.forEach((land) => {
    if (land.groupId === 'basicLands') {
      const color = land.mainColorProduction[0];
      if (colorIdentity.includes(color)) {
        basicLandInfo[color] = { id: land.id };
      }
    }
  });

  // == Step 2: Fulfill Minimum Basic Land Requirement ==

  for (const color of colorIdentity) {
    if (basicLandInfo[color]) {
      for (let i = 0; i < minNumberOfBasics; i += 1) {
        finalSelection.push({ id: basicLandInfo[color].id, amount: 1 });
        remainingLands -= 1;
      }
    }
  }

  // == Step 3: Lands already in the deck ==

  const selectedIds = new Set();
  allFlattenedLands.forEach((land) => {
    if (land.selected && land.groupId !== 'basicLands') {
      finalSelection.push({ id: land.id, amount: 1 });
      selectedIds.add(land.id);
      remainingLands -= 1;
    }
  });

  // == Step 4: Prioritized Non-Basic Land Selection ==

  const candidatePool = allFlattenedLands
    .filter((land) => {
      // Must not be already selected, and not a basic land
      if (selectedIds.has(land.id) || land.groupId === 'basicLands') {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Priority 1: 'isFavorite' group
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;

      // Priority 2: 'tier' in descending order
      if (a.tier !== b.tier) {
        return b.tier - a.tier;
      }
      return 0;
    });

  for (const land of candidatePool) {
    if (remainingLands <= 0) {
      break;
    }
    finalSelection.push({ id: land.id, amount: 1 });
    selectedIds.add(land.id);
    remainingLands -= 1;
  }

  // == Step 5: Fill Remaining Slots with Basic Lands ==

  if (remainingLands > 0) {
    const getColorSources = (selection) => {
      const counts = colorIdentity.reduce(
        (acc, color) => ({ ...acc, [color]: 0 }),
        {}
      );
      let totalSources = 0;

      for (const item of selection) {
        const landData = allLandsById.get(item.id);
        if (!landData) continue;

        // For lands like Command Tower or Exotic Orchard, they can produce any color
        // in the commander's identity.
        const providesAllColors =
          (landData.mainColorProduction || []).length === 0 &&
          landData.groupId !== 'basicLands';

        if (providesAllColors) {
          for (const color of colorIdentity) {
            counts[color] += item.amount;
          }
          totalSources += colorIdentity.length * item.amount;
        } else {
          for (const color of landData.mainColorProduction || []) {
            if (counts[color] !== undefined) {
              counts[color] += item.amount;
              totalSources += item.amount;
            }
          }
        }
      }
      return { counts, totalSources };
    };

    while (remainingLands > 0) {
      const { counts: currentSources } = getColorSources(finalSelection);
      const totalCurrentSources = Object.values(currentSources).reduce(
        (a, b) => a + b,
        0
      );

      let maxDeficit = -Infinity;
      let colorToAdd = colorIdentity[0];

      for (const color of colorIdentity) {
        const currentProportion =
          totalCurrentSources > 0
            ? (currentSources[color] || 0) / totalCurrentSources
            : 0;
        const targetProportion = targetProportions[color] || 0;
        const deficit = targetProportion - currentProportion;

        if (deficit > maxDeficit) {
          maxDeficit = deficit;
          colorToAdd = color;
        }
      }

      if (basicLandInfo[colorToAdd]) {
        finalSelection.push({ id: basicLandInfo[colorToAdd].id, amount: 1 });
        remainingLands -= 1;
      } else {
        // Failsafe in case a basic land for a color isn't in the list
        break;
      }
    }
  }

  // == Step 6: Final Output Generation ==

  const consolidatedManaBase = new Map();
  finalSelection.forEach((land) => {
    consolidatedManaBase.set(
      land.id,
      (consolidatedManaBase.get(land.id) || 0) + land.amount
    );
  });

  const finalArray = Array.from(consolidatedManaBase, ([id, amount]) => ({
    id,
    amount,
  }));

  return finalArray;
};

export const landSuggestions = ({
  numberOfLands,
  minNumberOfBasics,
  colorIdentity,
  manaSymbolCount: manaPipsByColor,
  groups,
}) => {
  const landSelection = createManaBase({
    numberOfLands,
    minNumberOfBasics,
    colorIdentity,
    manaSymbolCount: manaPipsByColor,
    groups,
  });

  return groups.map((group) => {
    const lands = group.lands.map((land) => {
      const selected = landSelection.find(
        (selectedLand) => selectedLand.id === land.id
      );

      return {
        ...land,
        selected: Boolean(selected),
        amount: selected?.amount || 0,
      };
    });

    return {
      ...group,
      lands,
    };
  });
};
