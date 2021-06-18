import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Flex from 'components/Elements/Shared/Flex';
import Expander from 'components/Elements/Shared/Expander';
import { useToggle } from '../../../../Hooks';
import SearchSettings from './SearchSettings';
import MultiInput from '../MultIinput';

const ANIMATION_DURATION = 300;

const StyledLink = styled.a`
  margin-top: 8px;
`;

export default ({ setCardOptions, onAddCards }) => {
  const [isExpanded, toggleExpanded] = useToggle();
  const [linkText, setLinkText] = useState('advanced...');

  useEffect(() => {
    const newLinkText = isExpanded ? 'show less' : 'advanced...';
    setTimeout(() => setLinkText(newLinkText), ANIMATION_DURATION);
  }, [isExpanded]);

  return (
    <Flex direction="column">
      <StyledLink type="link" onClick={toggleExpanded}>
        {linkText}
      </StyledLink>
      <Expander isExpanded={isExpanded}>
        <Flex direction="column">
          <SearchSettings setCardOptions={setCardOptions} />
          <MultiInput onAddCards={onAddCards} />
        </Flex>
      </Expander>
    </Flex>
  );
};
