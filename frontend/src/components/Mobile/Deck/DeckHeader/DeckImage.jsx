import React from 'react';
import { Affix } from 'antd';
import styled from 'styled-components';
import { Parallax } from 'react-parallax';
import { useWindowSize } from '../../../Hooks';

const StyledAffix = styled(Affix)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({ imgSrc }) => {
  const imageHeight = window.innerHeight * 0.2 + window.innerWidth * 0.2;
  useWindowSize();

  return (
    <>
      <StyledAffix offsetTop={50 - imageHeight}>
        <Parallax
          strength={400}
          bgImage={imgSrc}
          bgImageStyle={{ width: '100%', height: 'auto', top: 50 }}
        >
          <div style={{ height: 'calc(20vh + 20vw)' }} />
        </Parallax>
      </StyledAffix>
    </>
  );
};
