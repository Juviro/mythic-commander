import { colorPalette } from 'constants/colors';
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}
export const DeckCmc = ({ deck }: Props) => {
  const manaValues = deck.cards
    .filter((card) => !card.primaryTypes.includes('Land'))
    .reduce((acc, card) => {
      const { cmc } = card;
      const newCount = (acc[cmc] ?? 0) + 1;

      return {
        ...acc,
        [cmc]: newCount,
      };
    }, {});

  const data: { cmc: number; amount: number }[] = Object.entries(manaValues)
    .map(([cmc, amount]) => ({ cmc: Number(cmc), amount }))
    .sort((a, b) => a.cmc - b.cmc)
    .reduce((acc, val) => {
      if (!acc.length) return [val];

      const lastCmc = acc[acc.length - 1].cmc;
      const diffToPrevious = val.cmc - lastCmc;
      if (diffToPrevious === 1) return [...acc, val];

      // Some cmc values are missing in between, fill them in here
      const dummies = [...new Array(diffToPrevious - 1)].map((_, index) => ({
        cmc: lastCmc + index + 1,
        amount: 0,
      }));

      return [...acc, ...dummies, val];
    }, []);

  return (
    <DeckStat title="Mana Curve:" hidden={!data.length}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="cmc" />
        <Tooltip />
        <Bar
          dataKey="amount"
          stackId="a"
          maxBarSize={50}
          name="Number of Cards"
          fill={colorPalette[15]}
        />
      </BarChart>
    </DeckStat>
  );
};
