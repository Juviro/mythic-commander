import React from 'react';
import { Button } from 'antd';

import { Flex } from '../../../../Elements/Shared';

export default ({ numberOfCards, onShowAll }) => (
  <Flex justify="space-between" align="center">
    {`Found ${numberOfCards} cards`}
    {onShowAll && (
      <Button type="link" onClick={onShowAll}>
        show all
      </Button>
    )}
  </Flex>
);
