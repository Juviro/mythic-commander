import React from 'react';
import { List, Divider } from 'antd';

import { primary } from '../../../../constants/colors';

export default ({ title, elements = [], onClick }) => {
  if (!elements.length) return null;
  return (
    <>
      <Divider>{title}</Divider>
      <List style={{ color: primary }}>
        {elements.map(({ name, id }) => (
          <List.Item
            key={id}
            onClick={e => {
              e.stopPropagation();
              onClick({ name, id });
            }}
          >
            {name}
          </List.Item>
        ))}
      </List>
    </>
  );
};
