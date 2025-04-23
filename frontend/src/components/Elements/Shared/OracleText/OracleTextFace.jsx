import React from 'react';
import styled from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import { TextWithIcons } from 'components/Elements/Shared/ManaCost';
import { StyledWrapper } from '../ManaCost/TextWithIcons';

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  flex-wrap: wrap;

  ${StyledWrapper} {
    margin: 0;
  }
`;

const OracleTextFace = ({ cardType, cardLines, cardName, manaCost }) => {
  return (
    <>
      <StyledTitle>
        {manaCost && <TextWithIcons text={manaCost} />}
        {cardName && <span>{cardName}</span>}
        <span>-</span>
        {cardType && <span>{cardType}</span>}
      </StyledTitle>
      <Flex justify="center" style={{ margin: '16px 0' }} direction="column">
        {cardLines?.map((line) => (
          <TextWithIcons text={line} key={line} />
        ))}
      </Flex>
    </>
  );
};

export default OracleTextFace;
