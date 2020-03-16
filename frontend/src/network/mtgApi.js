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

export const getAllCreatureTypes = async () => {
  return Catalog.creatureTypes();
};
