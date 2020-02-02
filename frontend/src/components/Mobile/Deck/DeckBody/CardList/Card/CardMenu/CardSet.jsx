import React, { useContext } from 'react';
import styled from 'styled-components';
import CardContext from '../../../../../../CardProvider/CardProvider';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const StyledSetWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledNameWrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 4px;
  max-width: calc(50vw - 36px);
  color: rgba(0, 0, 0, 0.45);
`;

export default ({ card }) => {
  const { sets } = useContext(CardContext);
  const cardSet = { ...sets[card.set], setKey: card.set };

  return (
    <StyledSetWrapper>
      <StyledSetIcon src={cardSet.icon_svg_uri} alt={cardSet.name} />
      <StyledNameWrapper>{cardSet.name}</StyledNameWrapper>
    </StyledSetWrapper>
  );
};
