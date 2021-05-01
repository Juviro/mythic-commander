import { Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { UnifiedCard } from 'types/unifiedTypes';

const StyledHeadline = styled.h2`
  margin-bottom: 0;
  font-size: 18px;
`;

const StyledCommanderName = styled(Typography.Text)`
  font-size: 24px;
  font-weight: bold;
`;

interface Props {
  commanders: UnifiedCard[];
}

export const Title = ({ commanders }: Props) => {
  return (
    <Space direction="vertical">
      <StyledHeadline>EDHREC Search for</StyledHeadline>
      {commanders.map(({ name }, index) => (
        <StyledCommanderName key={name}>
          <span>{name}</span>
          {commanders.length > 1 && !index && <span> &amp;</span>}
        </StyledCommanderName>
      ))}
    </Space>
  );
};
