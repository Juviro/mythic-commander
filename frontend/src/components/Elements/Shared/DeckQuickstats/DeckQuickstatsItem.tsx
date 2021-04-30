import React from 'react';
import { List, Space, Tooltip, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { warning, error, success } from 'constants/colors';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  overflow: auto;
  max-height: 50vh;
`;
interface Props {
  text: string;
  status: string;
  cards?: UnifiedCard[];
}

const getIcon = (status: string) => {
  switch (status) {
    case 'ok':
      return <CheckCircleOutlined />;
    case 'warning':
      return <ExclamationCircleOutlined />;
    case 'error':
      return <CloseCircleOutlined />;
    default:
      return null;
  }
};

const getColor = (status: string) => {
  switch (status) {
    case 'ok':
      return success;
    case 'warning':
      return warning;
    case 'error':
      return error;
    default:
      return '';
  }
};

export const DeckQuickstatsItem = ({ text, status, cards }: Props) => {
  const color = getColor(status);
  const content = (
    <Space style={{ color, fontSize: 18 }}>
      {getIcon(status)}
      <Typography.Text type="secondary">{text}</Typography.Text>
    </Space>
  );

  if (!cards?.length) return content;

  const cardList = (
    <StyledWrapper>
      <List>
        {cards.map(({ id, name }) => (
          <List.Item key={id}>
            <Typography.Text style={{ color: 'white' }}>{name}</Typography.Text>
          </List.Item>
        ))}
      </List>
    </StyledWrapper>
  );

  return <Tooltip title={cardList}>{content}</Tooltip>;
};
