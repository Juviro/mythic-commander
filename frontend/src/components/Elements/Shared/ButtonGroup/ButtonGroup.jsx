import React from 'react';
import { Button } from 'antd';
import Flex from '../Flex';

export default ({ buttons }) => {
  const buttonHeight = 100 / (buttons.length || 1);

  return (
    <Flex>
      {buttons.map(({ title, onClick }) => (
        <Button type="link" onClick={onClick} style={{ height: buttonHeight }}>
          {title}
        </Button>
      ))}
    </Flex>
  );
};
