import React, { useRef } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'antd';
import { useQuery } from '@apollo/client';
import CardSearch from '../../Shared/CardSearch';
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
  cardOptions: { cardPrefix, cards, loading },
  allowFoilInput,
  alignTop,
  additionalOptions,
  inputProps,
}) => {
  const searchInputRef = useRef(null);
  const { data } = useQuery(getOwnedCardNames);

  const focusInput = () => searchInputRef.current.focus();
  useShortcut('a', focusInput, { focusId });

  const ownedCardNames = data?.ownedCardNames ?? [];

  return (
    <Tooltip title="Add card [A]">
      <StyledWrapper style={style}>
        <CardSearch
          ref={searchInputRef}
          ownedCardNames={ownedCardNames}
          additionalOptions={additionalOptions}
          containedCardNames={containedCardNames}
          onSearch={(card, name, fullCard) => onAddCards([card], name, fullCard)}
          resetSearch
          autoFocus={autoFocus}
          placeholder={placeholder}
          width="100%"
          cards={cards}
          loading={loading}
          alignTop={alignTop}
          cardPrefix={cardPrefix}
          allowFoilInput={allowFoilInput}
          inputProps={inputProps}
        />
      </StyledWrapper>
    </Tooltip>
  );
};
