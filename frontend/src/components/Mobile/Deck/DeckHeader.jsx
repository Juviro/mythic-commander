import React from 'react';
import { Affix } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledHeaderImage = styled.img`
  width: 100%;
  height: 100%;
`;

const DeckList = ({ deck }) => {
  return (
    <StyledHeader>
      <Affix offsetTop={-180}>
        <StyledHeaderImage src={deck.imgSrc} />
      </Affix>
    </StyledHeader>
  );
};

export default withRouter(DeckList);
