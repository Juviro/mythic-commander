import db from 'backend/database/db';
import { NextApiRequest, NextApiResponse } from 'next';

const planechaseOptions = async (_: NextApiRequest, res: NextApiResponse) => {
  const { rows: options } = await db.raw(`
      SELECT
        set_name, set, promo_types, count(*) 
      FROM 
        cards 
      WHERE 
        (type_line ILIKE 'Plane %' OR type_line ILIKE 'Phenomenon')
      AND
        (promo_types IS NULL OR NOT promo_types @> ARRAY['playtest'])
      GROUP BY 
        set_name, set, promo_types;
    `);

  res.status(200).json(options);
};

export default planechaseOptions;
