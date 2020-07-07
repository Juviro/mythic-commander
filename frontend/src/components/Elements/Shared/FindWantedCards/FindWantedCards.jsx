import React from 'react';
import { Button } from 'antd';

import { useToggle } from '../../../Hooks';
import FindCardsModal from './FindCardsModal';

export default ({ style }) => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <>
      <Button type="primary" onClick={toggleIsOpen} style={style}>
        Find Cards you need...
      </Button>
      {isOpen && <FindCardsModal onClose={toggleIsOpen} />}
    </>
  );
};
