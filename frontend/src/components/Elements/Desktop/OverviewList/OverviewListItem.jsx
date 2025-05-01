import React from 'react';
import { Card, Typography, Space } from 'antd';

import ManaSymbol from 'components/Elements/Shared/ManaCost/ManaSymbol';
import styled from 'styled-components';
import Cover from './Cover';
import formatDate from '../../../../utils/formatDate';

const StyledInfo = styled.div`
  gap: 8px;
  flex-wrap: wrap;
  display: flex;
`;

const StyledTitle = styled.div`
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Description = ({ list }) => (
  <Space direction="vertical" size={4}>
    <StyledInfo>
      <Typography.Text
        style={{ whiteSpace: 'nowrap' }}
      >{`${list.numberOfCards} cards`}</Typography.Text>
      {list.colors && (
        <Space size={4} style={{ marginRight: 2 }}>
          {list.colors.map((color) => (
            <ManaSymbol symbol={color} key={color} size={20} />
          ))}
        </Space>
      )}
    </StyledInfo>
    <Space size={4} direction="row" style={{ fontStyle: 'italic', marginTop: 4 }}>
      <Typography.Text type="secondary">Last edit:</Typography.Text>
      <Typography.Text type="secondary">
        {formatDate(list.lastEdit, true)}
      </Typography.Text>
    </Space>
  </Space>
);

export default ({ list, onClick }) => {
  return (
    <Card hoverable cover={<Cover list={list} />} onClick={() => onClick(list.id)}>
      <Card.Meta
        title={<StyledTitle>{list.name}</StyledTitle>}
        description={<Description list={list} />}
      />
    </Card>
  );
};
