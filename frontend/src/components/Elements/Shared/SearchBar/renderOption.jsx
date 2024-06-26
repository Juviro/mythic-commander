import React from 'react';

import styled from 'styled-components';
import { highlightText } from '../../../../utils/highlightText';
import { getImageUrl } from '../../../../utils/cardImage';

const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3px;
  height: 36px;
  width: 100%;
  align-items: center;
`;

const CardImageWrapper = styled.div`
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledName = styled.span`
  margin-left: 11px;
  max-width: calc(100% - ${({ isShort }) => (isShort ? 90 : 30)}px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const StyledOwnedTag = styled.span`
  right: 16px;
  color: #1fb31f;
  font-size: 12px;
  position: absolute;
`;

const StyledCardImage = styled.img`
  height: 36px;
  width: 26px;
  display: flex;
`;

export default (searchString) => (element) => {
  const { name, id, oracle_id, imgKey, owned } = element;

  return {
    value: oracle_id,
    key: id,
    label: (
      <StyledOption>
        <CardImageWrapper>
          <StyledCardImage src={getImageUrl(id, imgKey)} />
        </CardImageWrapper>
        <StyledName isShort={owned}>{highlightText(searchString, name)}</StyledName>
        <StyledOwnedTag>{owned && 'owned'}</StyledOwnedTag>
      </StyledOption>
    ),
  };
};
