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

const SUBTYPE_CATEGORIES = [
  'Creature',
  'Land',
  'Enchantment',
  'Artifact',
  'Planeswalker',
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
