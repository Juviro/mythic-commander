import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Typography } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

interface MenuAction {
  icon: React.ReactNode;
  title: string;
  key?: string;
  onClick: () => void;
}

export type ActionType = MenuAction | React.ReactNode;

interface Props extends Pick<DropDownProps, 'placement'> {
  actions: ActionType[];
  fontSize?: number;
}

const isMenuAction = (action: ActionType): action is MenuAction => {
  return (action as MenuAction).title !== undefined;
};

export default ({ actions, placement, fontSize = 20 }: Props) => {
  const menuItems = actions.map((action) => {
    if (!isMenuAction(action)) {
      return {
        key: Math.random().toString(),
        label: action,
      };
    }

    const { key, icon, title, onClick } = action;

    return {
      key: key ?? title,
      onClick,
      label: (
        <div>
          {icon}
          <Typography.Text>{title}</Typography.Text>
        </div>
      ),
    };
  });

  const menuNew: MenuProps = {
    items: menuItems,
  };

  return (
    <Dropdown menu={menuNew} trigger={['click']} placement={placement}>
      <MoreOutlined style={{ fontSize }} />
    </Dropdown>
  );
};
