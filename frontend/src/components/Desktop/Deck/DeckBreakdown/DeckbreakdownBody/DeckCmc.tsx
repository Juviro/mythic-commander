import React from 'react';
import { Space, Typography } from 'antd';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { typeColors } from 'constants/colors';
import { UnifiedDeck } from 'types/unifiedTypes';
import { CARD_TYPE_DECK_ORDER } from 'components/Provider/CardProvider/staticTypes';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

export const getPrimaryType = (primaryTypes: string[]) => {
  return primaryTypes.sort((a, b) => {
    if (CARD_TYPE_DECK_ORDER.indexOf(a) === -1) return 1;
    if (CARD_TYPE_DECK_ORDER.indexOf(b) === -1) return -1;

    return CARD_TYPE_DECK_ORDER.indexOf(a) - CARD_TYPE_DECK_ORDER.indexOf(b);
  })[0];
};

const labelFormatter = (manaValue: string) => (
  <Typography.Text strong> {`Mana Value ${manaValue}`}</Typography.Text>
);

export const DeckCmc = ({ deck }: Props) => {
  const manaValues = deck.cards
    // The integer check if for pretty much one card,
    // "Little Girl", that costs 1/2 white Mana.
    .filter((card) => !card.primaryTypes.includes('Land') && Number.isInteger(card.cmc))
    .reduce((acc, card) => {
      const { cmc, primaryTypes, amount } = card;

      const primaryType = getPrimaryType(primaryTypes);

      const cmcByType = acc[cmc] ?? {};
      const currentCount = cmcByType[primaryType] ?? 0;

      return {
        ...acc,
        [cmc]: {
          ...cmcByType,
          total: (cmcByType.total ?? 0) + amount,
          [primaryType]: currentCount + amount,
        },
      };
    }, {});

  const data: { cmc: number; [key: string]: number }[] = Object.keys(manaValues)
    .map((key) => ({ cmc: Number(key), ...manaValues[key] }))
    .sort((a, b) => a.cmc - b.cmc)
    .reduce((acc, val) => {
      if (!acc.length) return [val];

      const lastCmc = acc[acc.length - 1].cmc;
      const diffToPrevious = val.cmc - lastCmc;

      // The check for cmc diff < 100 is for a single card,
      // "Gleemax", that has a cmc of 1.000.000
      if (diffToPrevious === 1 || diffToPrevious > 100) return [...acc, val];

      // Some cmc values are missing in between, fill them in here
      const dummies = [...new Array(diffToPrevious - 1)].map((_, index) => ({
        cmc: lastCmc + index + 1,
      }));

      return [...acc, ...dummies, val];
    }, []);

  const { count, cmcSum } = Object.keys(manaValues).reduce(
    (acc, cmc) => {
      const { total } = manaValues[cmc];
      return {
        count: acc.count + total,
        cmcSum: acc.cmcSum + total * Number(cmc),
      };
    },
    { count: 0, cmcSum: 0 }
  );

  const avgCmc = Math.round((cmcSum / count) * 10) / 10;

  return (
    <DeckStat title="Mana Curve" hidden={!data.length}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis dataKey="cmc" />
          <Tooltip labelFormatter={labelFormatter} />
          {CARD_TYPE_DECK_ORDER.map((type) => (
            <Bar
              key={type}
              dataKey={type}
              stackId="a"
              maxBarSize={50}
              name={type}
              fill={typeColors[type]}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <Space>
        <Typography.Text strong>Average Mana Value:</Typography.Text>
        <Typography.Text>{avgCmc}</Typography.Text>
      </Space>
    </DeckStat>
  );
};
