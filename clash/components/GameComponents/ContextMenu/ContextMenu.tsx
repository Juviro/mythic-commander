import React, { PropsWithChildren } from 'react';
import { Dropdown, DropdownProps, MenuProps } from 'antd';

interface Props extends PropsWithChildren {
  items: MenuProps['items'] | null;
  placement?: DropdownProps['placement'];
  open?: boolean;
}

const ContextMenu = ({ children, items, placement = 'top', open }: Props) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!items?.length) return <>{children}</>;

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{ items }}
      placement={placement}
      destroyPopupOnHide
      open={open}
      // We need to stop the propagation, otherwise useClickedOutside will not work
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdownRender={(menu) => <div onMouseUp={(e) => e.stopPropagation()}>{menu}</div>}
    >
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
