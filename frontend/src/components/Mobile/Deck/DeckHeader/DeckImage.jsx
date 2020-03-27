import React from 'react';
import { Affix, Spin } from 'antd';
import styled from 'styled-components';
import { Parallax } from 'react-parallax';
import { useWindowSize } from '../../../Hooks';

const StyledAffix = styled(Affix)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(20vh + 20vw);
  border-bottom: 1px solid #f1f1f1;
`;

export default ({ imgSrc, loading }) => {
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
          <StyledWrapper>{loading && <Spin />}</StyledWrapper>
        </Parallax>
      </StyledAffix>
    </>
  );
};
