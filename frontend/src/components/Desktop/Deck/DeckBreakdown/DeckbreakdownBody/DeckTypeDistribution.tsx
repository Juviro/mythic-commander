import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import { typeColors } from 'constants/colors';
import { CARD_TYPES } from 'components/Provider/CardProvider/staticTypes';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

export const DeckTypeDistribution = ({ deck }: Props) => {
  const cardsbyType = deck?.cards.reduce((acc, card) => {
    const { primaryTypes, amount } = card;
    primaryTypes
      .filter((type) => CARD_TYPES.includes(type))
      .forEach((type) => {
        if (!acc[type]) acc[type] = 0;
        acc[type] += amount;
      });

    return acc;
  }, {});

  const data = Object.keys(cardsbyType).map((name) => ({
    name,
    amount: cardsbyType[name],
  }));

  return (
    <DeckStat title="Card Type Distribution" hidden={!deck?.cards.length}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            label={({ name }) => name}
            data={data}
            dataKey="amount"
            valueKey="type"
            outerRadius={80}
            isAnimationActive={false}
            labelLine={false}
          >
            {data.map(({ name }) => (
              <Cell key={name} fill={typeColors[name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </DeckStat>
  );
};
