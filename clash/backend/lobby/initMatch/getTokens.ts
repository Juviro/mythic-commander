import db from 'backend/database/db';
import { TokenOption } from 'backend/database/gamestate.types';

type Color = 'W' | 'U' | 'B' | 'R' | 'G';

interface DBTokens extends Omit<TokenOption, 'colors'> {
  colors: Color[];
}

const getTokens = async () => {
  const { rows: tokens } = await db.raw<{ rows: DBTokens[] }>(`
      SELECT 
        ARRAY_AGG(id) as ids,
        name, 
        oracle_text,
        power || '/' || toughness AS "powerToughness",
        colors,
        layout
      FROM 
        cards 
      WHERE 
        (set_type = 'token' OR layout = 'token')
      AND
      ${/* The one ring and the incubat tokens are the only dfc we want to display */ ''}
        (
          name NOT ilike '%//%' 
          OR id = '7215460e-8c06-47d0-94e5-d1832d0218af' 
          OR id = '2c5ed737-657b-43bf-b222-941da7579a4a'
        )
      AND
        lang = 'en'
      AND
        type_line != 'Sorcery'
      AND
        set != 'tdag'
      AND
        type_line != 'Artifact'
      AND
        type_line != 'Enchantment'
      AND
        set_type != 'memorabilia'
      GROUP BY
        name,
        oracle_text,
        "powerToughness",
        colors,
        layout;
 `);

  const getColorsLabel = (colors: Color[]) => {
    if (!colors?.length) return '';

    const colorLabels = {
      W: 'White',
      U: 'Blue',
      B: 'Black',
      R: 'Red',
      G: 'Green',
    };
    return colors.map((color) => colorLabels[color]).join(', ');
  };

  return tokens.map(({ colors, ...rest }) => ({
    ...rest,
    colors: getColorsLabel(colors),
  }));
};

export default getTokens;
