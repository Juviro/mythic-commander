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
        name NOT ilike '%//%'
      AND
        type_line != 'Sorcery'
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
