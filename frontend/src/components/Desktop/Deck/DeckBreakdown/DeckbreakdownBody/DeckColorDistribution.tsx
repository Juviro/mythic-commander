import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import { greyBorder, manaSymbolColors } from 'constants/colors';
import { Typography } from 'antd';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

const getFullColor = (colorLetter) => {
  switch (colorLetter) {
    case 'W':
      return 'White';
    case 'U':
      return 'Blue';
    case 'B':
      return 'Black';
    case 'R':
      return 'Red';
    case 'G':
      return 'Green';
    default:
      return colorLetter;
  }
};

const getSymbolFromColor = (color) => {
  return color === 'Blue' ? 'U' : color.slice(0, 1);
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, value }) => {
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      key={name}
    >
      {`${name} (${value})`}
    </text>
  );
};

const tooltipFormatter = (amount) => (
  <>
    <Typography.Text strong>{amount}</Typography.Text>
    <Typography.Text> Color Symbols</Typography.Text>
  </>
);

export const DeckColorDistribution = ({ deck }: Props) => {
  const colorDistribution = deck?.cards.reduce((acc, card) => {
    const { mana_cost, amount } = card;
    const colorSymbols = mana_cost.replace(/[^WUBRG]/g, '').split('');

    colorSymbols.forEach((symbol) => {
      const fullColor = getFullColor(symbol);
      const currentAmount = acc[fullColor] ?? 0;
      acc[fullColor] = currentAmount + amount;
    });

    return acc;
  }, {});

  const data = Object.keys(colorDistribution).map((color) => ({
    name: color,
    amount: colorDistribution[color],
  }));

  return (
    <DeckStat title="Color Distribution" hidden={!deck?.cards.length}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            // @ts-ignore
            label={renderCustomizedLabel}
            data={data}
            dataKey="amount"
            valueKey="type"
            outerRadius={80}
            isAnimationActive={false}
            labelLine={false}
            stroke={greyBorder}
          >
            {data.map(({ name }) => (
              <Cell key={name} fill={manaSymbolColors[getSymbolFromColor(name)]} />
            ))}
          </Pie>
          <Tooltip labelFormatter={() => 'cewfewf'} formatter={tooltipFormatter} />
        </PieChart>
      </ResponsiveContainer>
    </DeckStat>
  );
};
