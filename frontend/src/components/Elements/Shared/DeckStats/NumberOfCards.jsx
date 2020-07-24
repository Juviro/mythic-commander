import React from 'react';
import { Typography, Button } from 'antd';
import styled from 'styled-components';

import { getNumberOfCards } from '../../../../utils/deck';

const StyledLabel = styled(Typography.Text).attrs({ type: 'secondary' })`
  margin: 8px;
  font-size: 16px;
`;

export default ({ deck, displayOwnedOnly, toggleDisplayOwnedOnly }) => {
  const numberOfUnowned = deck.cards.filter(({ owned }) => !owned).length;

  const unownedLabel = displayOwnedOnly
    ? 'show all cards'
    : `(${numberOfUnowned} unowned)`;

  return (
    <span>
      <StyledLabel>{`${getNumberOfCards(deck.cards)} cards`}</StyledLabel>
      {Boolean(numberOfUnowned) && (
        <Button type="link" onClick={toggleDisplayOwnedOnly} style={{ paddingLeft: 0 }}>
          {unownedLabel}
        </Button>
      )}
    </span>
  );
};
