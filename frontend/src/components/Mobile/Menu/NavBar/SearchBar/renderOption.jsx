import React from 'react';

import styled from 'styled-components';
import { UnorderedListOutlined } from '@ant-design/icons';
import { highlightText } from '../../../../../utils/highlightText';
import { getImageUrl } from '../../../../../utils/cardImage';

const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 3px;
  height: ${({ isCard }) => (isCard ? 36 : 24)}px;
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
  max-width: calc(100vw - ${({ isShort }) => (isShort ? 170 : 130)}px);
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

const StyledDeckImage = styled.img`
  margin: 0 8px 0 0;
  border-radius: 2px;
  overflow: hidden;
  height: 23px;
  min-width: 32px;
  max-width: 32px;
  display: block;
`;

const StyledCardImage = styled.img`
  height: 36px;
  width: 26px;
  display: flex;
`;

export default (searchString, type) => element => {
  const { name, id, oracle_id, imgSrc, imgKey, owned } = element;

  const elementId = type === 'CARD' ? oracle_id : id;

  const preview =
    type === 'WANTS' ? null : imgSrc ? (
      <StyledDeckImage src={imgSrc} />
    ) : (
      <StyledCardImage src={getImageUrl(id, imgKey)} />
    );

  return {
    value: JSON.stringify({ type, id: elementId }),
    label: (
      <StyledOption isCard={type === 'CARD'}>
        {preview ? (
          <CardImageWrapper>{preview}</CardImageWrapper>
        ) : (
          <UnorderedListOutlined style={{ width: 24 }} />
        )}
        <StyledName isShort={owned}>
          {highlightText(searchString, name)}
        </StyledName>
        <StyledOwnedTag>{owned && 'owned'}</StyledOwnedTag>
      </StyledOption>
    ),
  };
};
