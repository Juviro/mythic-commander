import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => {
  return (
    <Wrapper>
      <LoadingOutlined />
    </Wrapper>
  );
};

export default Spinner;
