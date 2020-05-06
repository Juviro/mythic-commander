import React from 'react';
import styled from 'styled-components';

import mkmIcon from '../../../../assets/purchaseIcons/mkm.png';
import edhrecIcon from '../../../../assets/purchaseIcons/edhrec.png';
import scryfallIcon from '../../../../assets/purchaseIcons/scryfall.png';
import cardKingdomIcon from '../../../../assets/purchaseIcons/cardKingdom.ico';
import CustomSkeleton from '../CustomSkeleton';

const StyledPurchaseIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

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

  const encodedName = encodeURI(name);
  const cardMarketUri = `https://www.cardmarket.com/en/Magic/Products/Search?searchString=${encodedName}`;
  const cardKingdomUri = `https://www.cardkingdom.com/catalog/search?search=header&filter%5Bname%5D=${encodedName}`;
  const edhrecUri = `https://edhrec.com/route/?cc=${encodedName}`;
  const scryfallUri = card.scryfall_uri;

  const options = [
    {
      icon: cardKingdomIcon,
      uri: cardKingdomUri,
      name: 'Card Kingdom',
    },
    {
      icon: mkmIcon,
      uri: cardMarketUri,
      name: 'Cardmarket',
    },
    {
      icon: edhrecIcon,
      uri: edhrecUri,
      name: 'EDHREC',
    },
    {
      icon: scryfallIcon,
      uri: scryfallUri,
      name: 'Scryfall',
    },
  ];

  return (
    <StyledPurchaseIcons>
      {options.map(({ icon, uri, name: serviceName }) => (
        <a
          href={uri}
          target="_blank"
          rel="noopener noreferrer"
          key={serviceName}
          style={{ minWidth: 130, padding: '8px 0' }}
        >
          <StyledPurchaseIcon src={icon} />
          <span>{serviceName}</span>
        </a>
      ))}
    </StyledPurchaseIcons>
  );
};
