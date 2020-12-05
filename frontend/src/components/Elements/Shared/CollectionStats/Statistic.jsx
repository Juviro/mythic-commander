import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Space, Statistic } from 'antd';
import styled from 'styled-components';
import { roundValue } from 'utils/math';
import { error, success } from 'constants/colors';
import DesktopTooltip from '../../Desktop/DesktopTooltip';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 900px) {
    &:not(:first-child) {
      ${({ horizontal }) => (horizontal ? 'margin-left: 32px;' : 'margin-top: 16px;')};
    }
  }
`;

const getColor = ({ development }) => {
  if (development > 0) {
    return success;
  }
  if (development < 0) {
    return error;
  }
  return 'rgba(0, 0, 0, 0.55)';
};

const StyledDevelopment = styled.span`
  color: ${getColor};
  align-self: flex-end;
  margin-bottom: 4px;
  font-size: 16px;
  margin-left: 16px;
`;

const Development = ({ value, referenceValue, unit = 'cards' }) => {
  if (typeof referenceValue !== 'number' || !referenceValue) return null;

  const absoluteDevelopment = Math.round(value - referenceValue);
  const development = ((value - referenceValue) / referenceValue) * 100;

  const prefix = development > 0 ? '+' : development < 0 ? '' : '±';
  const icon =
    development > 0 ? (
      <ArrowUpOutlined />
    ) : development < 0 ? (
      <ArrowDownOutlined />
    ) : null;

  const label = `${prefix}${roundValue(development, 2)}%`;

  const tooltip = `${prefix}${absoluteDevelopment} ${unit} in the last 7 days`;

  return (
    <DesktopTooltip title={tooltip} placement="bottom">
      <StyledDevelopment development={development}>
        <Space>
          {icon}
          {label}
        </Space>
      </StyledDevelopment>
    </DesktopTooltip>
  );
};

export default ({ horizontal, title, value, referenceValue, prefix }) => {
  return (
    <StyledWrapper horizontal={horizontal}>
      <Statistic loading title={title} value={value} prefix={prefix} precision={0} />
      <Development value={value} unit={prefix} referenceValue={referenceValue} />
    </StyledWrapper>
  );
};
