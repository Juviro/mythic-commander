import React from 'react';
import { Divider } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import { typeColors } from 'constants/colors';
import { CARD_TYPES, CardType } from 'components/Provider/CardProvider/staticTypes';
import DeckCardSubTypes from './DeckCardSubTypes';
import { DeckStat } from '../DeckStat';

interface Props {
  deck: UnifiedDeck;
}

export const DeckTypeDistribution = ({ deck }: Props) => {
  const cardsbyType = deck?.cards.reduce((acc, card) => {
    const { primaryTypes, amount } = card;
    primaryTypes
      .filter((type) => CARD_TYPES.includes(type as CardType))
      .forEach((type) => {
        if (!acc[type]) acc[type] = 0;
        acc[type] += amount;
      });

    return acc;
  }, {});

  const cardsbyTypeWithAmount = Object.keys(cardsbyType).map((name: CardType) => ({
    name,
    amount: cardsbyType[name],
  }));

  return (
    <DeckStat title="Card Types" hidden={!deck?.cards.length}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            label={({ name }) => name}
            data={cardsbyTypeWithAmount}
            dataKey="amount"
            valueKey="type"
            outerRadius={80}
            isAnimationActive={false}
            labelLine={false}
          >
            {cardsbyTypeWithAmount.map(({ name }) => (
              <Cell key={name} fill={typeColors[name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Divider />
      <DeckCardSubTypes deck={deck} cardsbyTypeWithAmount={cardsbyTypeWithAmount} />
    </DeckStat>
  );
};
