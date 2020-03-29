import React from 'react';
import styled from 'styled-components';

import mkmIcon from '../../../assets/purchaseIcons/mkm.png';
import ckIcon from '../../../assets/purchaseIcons/ck.ico';
import CustomSkeleton from '../CustomSkeleton';

const StyledPurchaseIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

const StyledPurchaseIcons = styled.div`
  width: 100%;
  display: flex;
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

  const options = [
    {
      icon: ckIcon,
      uri: cardKingdomUri,
      name: 'Card Kingdom',
    },
    {
      icon: mkmIcon,
      uri: cardMarketUri,
      name: 'Cardmarket',
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
        >
          <StyledPurchaseIcon src={icon} />
          <span>{serviceName}</span>
        </a>
      ))}
    </StyledPurchaseIcons>
  );
};
