import React from 'react';
import { Space, List, Typography, Collapse } from 'antd';
import styled from 'styled-components';

const StyledPreview = styled.img`
  width: 42px;
  height: 32px;
  border-radius: 2px;
`;

export default ({ elements, onClick, title }) => (
  <Collapse style={{ marginTop: 16 }}>
    <Collapse.Panel key="1" header={`Add to ${title}...`} className="no-padding-collapse">
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
    </Collapse.Panel>
  </Collapse>
);
