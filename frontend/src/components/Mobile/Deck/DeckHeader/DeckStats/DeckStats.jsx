import React from 'react';
import styled from 'styled-components';
import NotLegalWarning from './NotLegalWarning';

const StyledInfoBox = styled.div`
  width: 100%;
  padding: 16px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledStat = styled.div`
  font-size: 12px;
`;

export default ({ deck }) => {
  return (
    <>
      <StyledInfoBox>
        <StyledHeader>
          <StyledTitle>{deck.name}</StyledTitle>
          <NotLegalWarning deck={deck} />
        </StyledHeader>
        <StyledStat>{`${deck.numberOfCards} cards`}</StyledStat>
      </StyledInfoBox>
    </>
  );
};
