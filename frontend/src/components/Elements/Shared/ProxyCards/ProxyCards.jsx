import React from 'react';
import { Dropdown, Menu, Button } from 'antd';

export default ({ id }) => {
  const url = `/proxy/wants/${id}`;
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href={url}>
          All cards
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${url}?filter=unowned-only`}
        >
          Unowned cards only
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomLeft" trigger="click">
      <Button type="link">Proxy Cards...</Button>
    </Dropdown>
  );
};
