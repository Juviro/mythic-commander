import { Sets, Catalog } from 'scryfall-sdk';

export const getAllSets = async () => {
  const sets = await Sets.all();

  return sets.reduce((acc, { code, name, icon_svg_uri }) => {
    return {
      ...acc,
      [code]: {
        name,
        icon_svg_uri,
      },
    };
  }, {});
};

// The order of these elements matter for the subTypesMap:
// Because there is now one sub type that can have two supertypes:
// Equipement can be both Artifact and Planeswalker.
// If Planeswalker was before Artifact, then all Equipment would be
// categorized as Planeswalkers.
const SUBTYPE_CATEGORIES = [
  'Creature',
  'Land',
  'Enchantment',
  'Planeswalker',
  'Artifact',
  'Spell',
];

export const getSubtypes = async () => {
  const promises = SUBTYPE_CATEGORIES.map((category) =>
    Catalog[`${category.toLowerCase()}Types`]()
  );
  const result = await Promise.all(promises);
  return result.map((types, index) => ({
    category: SUBTYPE_CATEGORIES[index],
    types,
  }));
};
