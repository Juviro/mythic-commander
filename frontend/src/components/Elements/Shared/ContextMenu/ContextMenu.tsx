import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { primary } from '../../../../constants/colors';
import { useToggle } from '../../../Hooks';

export interface MenuItem {
  Icon: any;
  title: string;
  primary?: boolean;
  onClick: (card: UnifiedCard) => void;
}

interface Props {
  menuItems: MenuItem[];
  card: UnifiedCard;
}

export default ({ menuItems, card }: Props) => {
  const [isMenuOpen, toggleIsMenuOpen] = useToggle();
  if (!menuItems.length) return null;

  const menuNew: MenuProps = {
    onClick: toggleIsMenuOpen,
    items: menuItems.map(({ Icon, title, onClick }) => ({
      key: title,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onClick(card);
      },
      label: (
        <div>
          {Icon && <Icon style={{ color: primary }} />}
          {title}
        </div>
      ),
    })),
  };

  return (
    <Dropdown
      menu={menuNew}
      trigger={['click']}
      placement="bottomRight"
      open={isMenuOpen}
      onOpenChange={toggleIsMenuOpen}
      // @ts-ignore
      onClick={(e) => e.stopPropagation()}
    >
      <MoreOutlined onClick={toggleIsMenuOpen} style={{ fontSize: 20, padding: 6 }} />
    </Dropdown>
  );
};
