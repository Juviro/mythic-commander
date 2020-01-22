import React from 'react';
import { Affix } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Parallax } from 'react-parallax';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledHeaderImage = styled.img`
  width: 100%;
  height: 100%;
`;

const DeckList = ({ deck: { imgSrc } }) => {
  return (
    <StyledHeader>
      <Affix offsetTop={-150}>
        <Parallax strength={300} bgImage={imgSrc} bgImageStyle={{ width: '100%', height: 'auto', top: 50 }}>
          <div style={{ height: 200 }} />
          {/* <StyledHeaderImage src={imgSrc} /> */}
        </Parallax>
      </Affix>
    </StyledHeader>
  );
};

export default withRouter(DeckList);
