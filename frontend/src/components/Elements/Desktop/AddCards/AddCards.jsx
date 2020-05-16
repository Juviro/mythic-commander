import React, { useRef } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'antd';
import { useQuery } from 'react-apollo';
import CardSearch from '../../Shared/CardSearch';
import MultiInput from './MultIinput';
import { useShortcut } from '../../../Hooks';
import { getCollectionNames } from '../../../../queries';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default ({
  onAddCards,
  autoFocus,
  containedCardNames,
  focusId,
  style,
  placeholder,
}) => {
  const searchInputRef = useRef(null);
  const { data } = useQuery(getCollectionNames);
  const focusInput = () => searchInputRef.current.focus();
  useShortcut('a', focusInput, focusId);

  const ownedCardNames = data
    ? data.collection.cards.map(({ card: { name } }) => name)
    : [];

  return (
    <Tooltip title="Add card [A]">
      <StyledWrapper style={style}>
        <CardSearch
          ref={searchInputRef}
          ownedCardNames={ownedCardNames}
          containedCardNames={containedCardNames}
          onSearch={(card, name) => onAddCards([card], name)}
          defaultActiveFirstOption
          resetSearch
          autoFocus={autoFocus}
          placeholder={placeholder}
          width="100%"
        />
        <MultiInput onAddCards={onAddCards} />
      </StyledWrapper>
    </Tooltip>
  );
};
