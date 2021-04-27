import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { DropDownProps } from 'antd/lib/dropdown';

interface MenuAction {
  icon: React.ReactNode;
  title: string;
  key?: string;
  onClick: () => void;
}

type ActionType = MenuAction | MenuItem;

interface Props extends Pick<DropDownProps, 'placement'> {
  actions: ActionType[];
  fontSize?: number;
}

const isMenuAction = (action: ActionType): action is MenuAction => {
  return (action as MenuAction).title !== undefined;
};

export default ({ actions, placement, fontSize = 20 }: Props) => {
  const menu = (
    <Menu>
      {actions.map((action) => {
        if (!isMenuAction(action)) {
          return <Menu.Item key={Math.random()}>{action}</Menu.Item>;
        }

        const { key, icon, title, onClick } = action;

        return (
          <Menu.Item key={key ?? title} onClick={onClick}>
            {icon}
            <Typography.Text>{title}</Typography.Text>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} placement={placement}>
      <MoreOutlined style={{ fontSize }} />
    </Dropdown>
  );
};
