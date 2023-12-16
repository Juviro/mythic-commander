import React, { PropsWithChildren } from 'react';
import { Dropdown, MenuProps } from 'antd';

interface Props extends PropsWithChildren {
  items: MenuProps['items'] | null;
}

const ContextMenu = ({ children, items }: Props) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!items) return <>{children}</>;

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{ items }}
      placement="top"
      destroyPopupOnHide
    >
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
