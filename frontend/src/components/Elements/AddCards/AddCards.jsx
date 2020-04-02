import React, { useRef } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'antd';
import CardSearch from '../CardSearch';
import MultiInput from './MultIinput';
import { useShortcut } from '../../Hooks';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({ onAddCards, autoFocus }) => {
  const searchInputRef = useRef(null);
  const focusInput = () => searchInputRef.current.focus();
  useShortcut('a', focusInput);

  return (
    <Tooltip title="Add card [A]">
      <StyledWrapper>
        <CardSearch
          ref={searchInputRef}
          onSearch={(card, name) => onAddCards([card], name)}
          defaultActiveFirstOption
          resetSearch
          autoFocus={autoFocus}
          width="100%"
        />
        <MultiInput onAddCards={onAddCards} />
      </StyledWrapper>
    </Tooltip>
  );
};
