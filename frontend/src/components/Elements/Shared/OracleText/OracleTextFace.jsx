import React from 'react';
import Flex from 'components/Elements/Shared/Flex';
import { TextWithIcons } from 'components/Elements/Shared/ManaCost';
import styled from 'styled-components';

const StyledType = styled.div`
  align-self: baseline;
  font-weight: 500;
`;

const OracleTextFace = ({ cardType, cardLines }) => {
  return (
    <>
      {cardType && <StyledType>{cardType}</StyledType>}
      <Flex justify="center" style={{ margin: '16px 0' }} direction="column">
        {cardLines?.map((line) => (
          <TextWithIcons text={line} key={line} />
        ))}
      </Flex>
    </>
  );
};

export default OracleTextFace;
