import React from 'react';
import { Affix } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Parallax } from 'react-parallax';

const StyledAffix = styled(Affix)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DeckList = ({ deck: { imgSrc } }) => {
  return (
    <StyledAffix offsetTop={-150}>
      <Parallax strength={300} bgImage={imgSrc} bgImageStyle={{ width: '100%', height: 'auto', top: 50 }}>
        <div style={{ height: 200 }} />
      </Parallax>
    </StyledAffix>
  );
};

export default withRouter(DeckList);
