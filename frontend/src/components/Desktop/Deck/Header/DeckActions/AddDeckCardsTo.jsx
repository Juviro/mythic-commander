import React from 'react';
import { Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import AddCardsTo from 'components/Elements/Shared/AddCardsTo';
import { useToggle } from '../../../../Hooks';

export default ({ cards }) => {
  const [visible, toggleVisible] = useToggle();

  return (
    <>
      <Button type="link" onClick={toggleVisible} icon={<SwapOutlined />}>
        Add cards to...
      </Button>
      <AddCardsTo
        cardsToAdd={cards}
        onCancel={toggleVisible}
        onSubmit={toggleVisible}
        visible={visible}
      />
    </>
  );
};
