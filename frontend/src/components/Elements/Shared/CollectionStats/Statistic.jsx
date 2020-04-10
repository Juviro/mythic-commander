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
      prefix: '-',
      icon: ArrowDownOutlined,
      valueStyle: { color: '#cf1322' },
    };
  }
  return {
    icon: MinusOutlined,
    valueStyle: { color: 'rgba(0, 0, 0, 0.55)' },
  };
};

export default ({ small, title, value, referenceValue, suffix }) => {
  const development = ((value - referenceValue) / referenceValue) * 100;

  return (
    <StyledWrapper small={small}>
      <Statistic
        loading
        title={title}
        value={value}
        suffix={suffix}
        precision={0}
      />
      {referenceValue !== undefined && (
        <Statistic
          style={{ width: 110 }}
          value={Math.abs(development)}
          precision={2}
          title="Last 7 days"
          {...getSpecificProps(development)}
          suffix="%"
        />
      )}
    </StyledWrapper>
  );
};
