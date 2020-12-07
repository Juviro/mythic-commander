import React from 'react';
import { Button } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import { useToggle } from '../../../Hooks';
import FindCardsModal from './FindCardsModal';

export default ({ style }) => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <>
      <Button
        ghost
        type="primary"
        onClick={toggleIsOpen}
        style={style}
        icon={<SearchOutlined />}
      >
        Find Cards you need
      </Button>
      {isOpen && <FindCardsModal onClose={toggleIsOpen} />}
    </>
  );
};
