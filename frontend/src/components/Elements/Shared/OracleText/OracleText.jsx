import React from 'react';
import { Skeleton } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import { TextWithIcons } from 'components/Elements/Shared/ManaCost';
import styled from 'styled-components';

const StyledType = styled.div`
  align-self: baseline;
  font-weight: 500;
`;

export default ({ card, loading, isFlipped }) => {
  if (loading) return <Skeleton />;
  if (!card.oracle_text && !card.type_line) return null;

  const [cardTypeFront, cardTypeBack] = card.type_line?.split(' // ') ?? [];
  const cardType = isFlipped ? cardTypeBack : cardTypeFront;

  const cardFaces = card?.oracle_text?.split(/<\w+>/) ?? [];
  const cardFace = isFlipped && cardFaces.length > 1 ? cardFaces[1] : cardFaces[0];

  const cardLines = cardFace?.split('\n').filter(Boolean);

  return (
    <>
      {card.type_line && <StyledType>{cardType}</StyledType>}
      <Flex justify="center" style={{ margin: '16px 0' }} direction="column">
        {cardLines?.map((line) => (
          <TextWithIcons text={line} key={line} />
        ))}
      </Flex>
    </>
  );
};
