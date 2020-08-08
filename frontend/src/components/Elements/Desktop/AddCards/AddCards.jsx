import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'antd';
import { useQuery } from 'react-apollo';
import CardSearch from '../../Shared/CardSearch';
import MultiInput from './MultIinput';
import AdvancedSearch from './AdvancedSearch';
import { useShortcut } from '../../../Hooks';
import { getOwnedCardNames } from '../../../../queries';

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
  isAdvanced,
  allowFoilInput,
}) => {
  const searchInputRef = useRef(null);
  const { data } = useQuery(getOwnedCardNames);
  const [{ cardPrefix, cards, loading }, setCardOptions] = useState({});

  const focusInput = () => searchInputRef.current.focus();
  useShortcut('a', focusInput, focusId);

  const ownedCardNames = data ? data.ownedCardNames : [];

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
          cards={cards}
          loading={loading}
          cardPrefix={cardPrefix}
          allowFoilInput={allowFoilInput}
        />
        {isAdvanced ? (
          <AdvancedSearch setCardOptions={setCardOptions} onAddCards={onAddCards} />
        ) : (
          <MultiInput onAddCards={onAddCards} />
        )}
      </StyledWrapper>
    </Tooltip>
  );
};
