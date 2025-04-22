import React from 'react';
import { List, Space, Tooltip, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { warning, error, success, primary } from 'constants/colors';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  overflow: auto;
  max-height: 50vh;
`;

const StyledCenteredSpace = styled(Space)`
  & .ant-space-item {
    display: flex;
    align-items: center;
  }
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
    case 'info':
      return <InfoCircleOutlined />;
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
    case 'info':
      return primary;
    default:
      return '';
  }
};

export const DeckQuickstatsItem = ({ text, status, cards }: Props) => {
  const color = getColor(status);
  const content = (
    <StyledCenteredSpace style={{ color, fontSize: 18 }} align="center">
      {getIcon(status)}
      <Typography.Text type="secondary">{text}</Typography.Text>
    </StyledCenteredSpace>
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
