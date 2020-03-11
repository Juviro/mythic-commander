import { Sets } from 'scryfall-sdk';

// TODO: evaluate moving this to the backend as well
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
