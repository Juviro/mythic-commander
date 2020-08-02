import React from 'react';
import { Space, List, Typography } from 'antd';
import styled from 'styled-components';
import Flex from '../../Flex';

const StyledPreview = styled.img`
  width: 42px;
  height: 32px;
  border-radius: 2px;
`;

export default ({ elements, onClick }) => (
  <Flex direction="column" style={{ maxHeight: 550, width: 280, overflow: 'auto' }}>
    <List bordered className="hoverable">
      {elements.map(({ id, name, imgSrc }) => (
        <List.Item key={id} onClick={() => onClick(id, name)}>
          <Space>
            {imgSrc && <StyledPreview src={imgSrc} />}
            <Typography.Text ellipsis>{name}</Typography.Text>
          </Space>
        </List.Item>
      ))}
    </List>
  </Flex>
);
