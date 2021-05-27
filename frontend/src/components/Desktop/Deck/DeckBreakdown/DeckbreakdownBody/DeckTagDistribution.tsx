import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import getCardsByTag from 'utils/getCardsByTag';
import sumCardAmount from 'utils/sumCardAmount';
import { Typography } from 'antd';
import { getTagColor } from 'utils/tags';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

export const DeckTagDistribution = ({ deck }: Props) => {
  const cardsByTag = getCardsByTag(deck.cards);
  const data = cardsByTag
    .map(({ type, cards }) => ({
      tag: type,
      amount: sumCardAmount(cards),
    }))
    .filter(({ tag }) => tag !== 'Untagged');

  if (!data.length) return null;

  const maxAmount = data.reduce((max, { amount }) => (amount > max ? amount : max), 0);

  return (
    <DeckStat title="Tags" hidden={!data.length}>
      <ResponsiveContainer width="100%" height={data.length * 50}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <Tooltip
            labelFormatter={(tag) => <Typography.Text strong>{tag}</Typography.Text>}
          />
          <Bar
            dataKey="amount"
            maxBarSize={50}
            name="Number of Cards"
            isAnimationActive={false}
            width={500}
          >
            {data.map(({ tag }) => {
              const color = getTagColor(tag);
              return <Cell key={tag} fill={color?.background} stroke={color?.fill} />;
            })}
          </Bar>
          <XAxis type="number" />
          <YAxis
            dataKey="tag"
            type="category"
            width={1}
            tickLine={false}
            tick={({
              index,
              y,
              x,
              fill,
              verticalAnchor: _verticalAnchor,
              visibleTicksCount: _visibleTicksCount,
              ...props
            }) => {
              const { tag, amount } = data[index];
              const color = getTagColor(tag);

              const LARGEST_BAR_WIDTH = 510;
              const CHAR_WIDTH = 8;
              const currentBarWidth = LARGEST_BAR_WIDTH * (amount / maxAmount);
              const maxTextLength = tag.length * CHAR_WIDTH;

              const showLabelInline = currentBarWidth > maxTextLength;
              const newX = showLabelInline ? x + 15 : x + 15 + currentBarWidth;

              return (
                <text
                  {...props}
                  fill={color?.fill ?? fill}
                  y={y + 5}
                  x={newX}
                  textAnchor="start"
                >
                  {tag}
                </text>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </DeckStat>
  );
};
