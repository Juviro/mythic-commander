import React from 'react';
import { Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import { primary } from '../../../../constants/colors';
import { useToggle } from '../../../Hooks';

export default ({ menuItems, card }) => {
  const [isMenuOpen, toggleIsMenuOpen] = useToggle();
  if (!menuItems.length) return null;

  const menu = (
    <Menu onClick={toggleIsMenuOpen}>
      {menuItems.map(({ Icon, title, onClick }) => (
        <Menu.Item
          key={title}
          onClick={({ domEvent }) => {
            domEvent.stopPropagation();
            onClick(card);
          }}
        >
          {Icon && <Icon style={{ color: primary }} />}
          {title}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      style={{ padding: 8 }}
      overlay={menu}
      trigger="click"
      placement="bottomRight"
      visible={isMenuOpen}
      onVisibleChange={toggleIsMenuOpen}
      onClick={e => e.stopPropagation()}
    >
      <MoreOutlined
        onClick={toggleIsMenuOpen}
        style={{ fontSize: 20, padding: 6 }}
      />
    </Dropdown>
  );
};
