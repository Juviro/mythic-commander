import PurchaseIcon from 'components/Elements/Shared/PurchaseIcon';
import React from 'react';
import styled from 'styled-components';

import CustomSkeleton from '../CustomSkeleton';

const StyledPurchaseIcons = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default ({ card, loading }) => {
  if (!card || loading) return <CustomSkeleton.Line />;
  const { name } = card;

  const options = ['cardkingdom', 'cardmarket', 'edhrec', 'scryfall'];

  return (
    <StyledPurchaseIcons>
      {options.map((serviceName) => (
        <PurchaseIcon
          key={serviceName}
          cardName={name}
          serviceName={serviceName}
          displayName
          scryfall_uri={card.scryfall_uri}
          style={{ minWidth: 130, padding: '8px 0' }}
        />
      ))}
    </StyledPurchaseIcons>
  );
};
