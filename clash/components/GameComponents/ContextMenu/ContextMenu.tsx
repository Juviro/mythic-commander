import React, { PropsWithChildren } from 'react';
import { Dropdown, DropdownProps, MenuProps } from 'antd';

interface Props extends PropsWithChildren {
  items: MenuProps['items'] | null;
  placement?: DropdownProps['placement'];
}

const ContextMenu = ({ children, items, placement = 'top' }: Props) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!items) return <>{children}</>;

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{ items }}
      placement={placement}
      destroyPopupOnHide
    >
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
