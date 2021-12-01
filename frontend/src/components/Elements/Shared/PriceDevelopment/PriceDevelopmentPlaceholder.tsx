import { Empty } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';

const StyledWrapper = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

interface Props {
  loading: boolean;
}

const PriceDevelopmentPlaceholder = ({ loading }: Props) => {
  return (
    <StyledWrapper>
      {loading ? <Spinner /> : <Empty description="No price data available" />}
    </StyledWrapper>
  );
};

export default PriceDevelopmentPlaceholder;
