import React from 'react';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { Statistic } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  ${({ small }) => (small ? '' : 'margin-bottom: 16px;')};
`;

const getSpecificProps = development => {
  if (development > 0) {
    return {
      prefix: '+',
      icon: ArrowUpOutlined,
      valueStyle: { color: '#3f8600' },
    };
  }
  if (development < 0) {
    return {
      icon: ArrowDownOutlined,
      valueStyle: { color: '#cf1322' },
    };
  }
  return { prefix: '±', icon: MinusOutlined };
};

export default ({ small, displayedValue, title, value, referenceValue }) => {
  const development = ((value - referenceValue) / referenceValue) * 100;

  return (
    <StyledWrapper small={small}>
      <Statistic loading title={title} value={displayedValue || value} />
      {referenceValue !== undefined && (
        <Statistic
          style={{ width: 110 }}
          value={development}
          precision={2}
          title="Last 7 days"
          {...getSpecificProps(development)}
          suffix="%"
        />
      )}
    </StyledWrapper>
  );
};
