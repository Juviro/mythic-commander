import React, { useContext } from 'react';
import { Skeleton } from 'antd';

import styled from 'styled-components';
import CardContext from '../../CardProvider/CardProvider';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  width: 100%;
  padding: 16px;
`;

const StyledSetIcon = styled.img`
  height: auto;
  width: 20px;
  margin: 0 8px;
`;

const StyledSetName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default ({ card, loading, selectedCardId }) => {
  const { sets } = useContext(CardContext);
  if (!card || loading || !selectedCardId) {
    return (
      <StyledWrapper>
        <Skeleton active paragraph={null} />
      </StyledWrapper>
    );
  }

  const { set, set_name } = card.allSets.find(
    ({ id }) => id === selectedCardId
  );

  return (
    <StyledWrapper>
      <StyledSetIcon src={sets[set].icon_svg_uri} />
      <StyledSetName>{set_name}</StyledSetName>
    </StyledWrapper>
  );
};
