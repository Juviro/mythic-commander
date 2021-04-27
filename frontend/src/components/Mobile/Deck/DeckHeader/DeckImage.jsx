import React from 'react';
import { Affix, Spin } from 'antd';
import styled from 'styled-components';
import { useWindowSize } from '../../../Hooks';

const StyledAffix = styled(Affix)`
  width: 100%;
  height: calc(20vh + 20vw);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledImage = styled.div`
  width: 100vw;
  height: calc(20vh + 20vw);
  border-bottom: 1px solid #f1f1f1;

  background-image: url(${({ img }) => img});
  background-size: cover;
  background-repeat: no-repeat;
`;

export default ({ imgSrc, loading }) => {
  const imageHeight = window.innerWidth * 0.2 + window.innerHeight * 0.2;

  useWindowSize();
  return (
    <StyledAffix offsetTop={50 - imageHeight}>
      {loading ? <Spin /> : <StyledImage img={imgSrc} />}
    </StyledAffix>
  );
};
