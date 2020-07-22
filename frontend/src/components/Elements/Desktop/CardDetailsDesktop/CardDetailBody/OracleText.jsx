import React from 'react';
import { Skeleton } from 'antd';
import { Flex, TextWithIcons } from '../../../Shared';

export default ({ card, loading, isFlipped }) => {
  if (loading) return <Skeleton />;
  if (!card.oracle_text) return null;

  const cardFaces = card.oracle_text.split(/<\w+>/);
  const cardFace = isFlipped && cardFaces.length > 1 ? cardFaces[1] : cardFaces[0];

  const cardLines = cardFace.split('\n').filter(Boolean);

  return (
    <Flex justify="center" style={{ margin: '16px 0' }} direction="column">
      {cardLines.map(line => (
        <TextWithIcons text={line} key={line} />
      ))}
    </Flex>
  );
};
