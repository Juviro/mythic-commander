import React, { PropsWithChildren } from 'react';
import { Dropdown, MenuProps } from 'antd';

interface Props extends PropsWithChildren {
  items: MenuProps['items'];
}

const ContextMenu = ({ children, items }: Props) => {
  return (
    <Dropdown trigger={['contextMenu']} menu={{ items }} placement="top">
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
