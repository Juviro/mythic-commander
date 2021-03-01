import React, { useContext } from 'react';
import { Button } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import UserContext from 'components/Provider/UserProvider';
import { useToggle } from '../../../Hooks';
import FindCardsModal from './FindCardsModal';

export default ({ style }) => {
  const [isOpen, toggleIsOpen] = useToggle();
  const { user } = useContext(UserContext);

  if (!user) return null;

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
