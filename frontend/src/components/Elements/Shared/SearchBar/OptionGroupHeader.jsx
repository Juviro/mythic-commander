import React from 'react';
import { Button } from 'antd';
import Flex from '../Flex';

export default ({ numberOfCards, onShowAll, isLastSearched }) => {
  const getLabel = () => {
    if (isLastSearched) return 'Last searched cards';
    return `Found ${numberOfCards} card${numberOfCards === 1 ? '' : 's'}`;
  };

  return (
    <Flex justify="space-between" align="center">
      {getLabel()}
      {onShowAll && (
        <Button type="link" onClick={onShowAll}>
          show all
        </Button>
      )}
    </Flex>
  );
};
