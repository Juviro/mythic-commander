import React from 'react';
import { Typography } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import { greyBorder, manaSymbolColors } from 'constants/colors';
import {
  getFullColor,
  getSymbolFromColor,
  sortByColor,
} from '../../../../utils/cardColors';
import { getColorIdentity } from '../../../../utils/commander';

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

interface Props {
  deck: UnifiedDeck;
  colorKey: 'mana_cost' | 'produced_mana';
}

const ColorDistributionChart = ({ deck, colorKey }: Props) => {
  const hasCommander = Boolean(
    deck?.cards.filter(({ isCommander }) => isCommander)?.length
  );
  const colorIdentity = getColorIdentity(deck?.cards);

  const colorDistribution = deck?.cards.reduce((acc, card) => {
    const { amount } = card;
    let colorSymbols: string[];
    if (colorKey === 'mana_cost') {
      colorSymbols = card[colorKey].replace(/[^WUBRGC]/g, '').split('');
    } else {
      colorSymbols = card[colorKey];
    }

    colorSymbols
      ?.filter((colorSymbol) => {
        if (colorKey === 'mana_cost') return true;
        if (!hasCommander) return true;
        return colorSymbol === 'C' || colorIdentity.includes(colorSymbol);
      })
      .sort(sortByColor)
      .forEach((symbol) => {
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
        <Tooltip formatter={tooltipFormatter} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ColorDistributionChart;
