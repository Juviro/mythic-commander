import React from 'react';
import { Checkbox } from 'antd';

import { Flex, Expander } from '../../../Shared';
import { useToggle } from '../../../../Hooks';
import SearchSettings from './SearchSettings';
import MultiInput from '../MultIinput';

export default ({ setCardOptions, onAddCards }) => {
  const [isExpanded, toggleExpanded] = useToggle(true);

  return (
    <Flex direction="column">
      <Checkbox checked={isExpanded} onChange={toggleExpanded} style={{ marginTop: 8 }}>
        Advanced
      </Checkbox>
      <Expander isExpanded={isExpanded}>
        <Flex direction="column">
          <SearchSettings setCardOptions={setCardOptions} />
          <MultiInput onAddCards={onAddCards} />
        </Flex>
      </Expander>
    </Flex>
  );
};
