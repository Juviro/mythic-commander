import React from 'react';
import styled from 'styled-components';

import mkmIcon from '../../../../assets/purchaseIcons/mkm.png';
import edhrecIcon from '../../../../assets/purchaseIcons/edhrec.png';
import tcgplayer from '../../../../assets/purchaseIcons/tcgplayer.svg';
import scryfallIcon from '../../../../assets/purchaseIcons/scryfall.png';
import cardKingdomIcon from '../../../../assets/purchaseIcons/cardKingdom.ico';
import Hint from '../Hint';

const StyledPurchaseIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

const StyledWrapper = styled.span`
  display: flex;
  align-items: center;
`;
const StyledLabel = styled.span`
  word-break: keep-all;
`;

export type ExternalService =
  | 'cardmarket'
  | 'edhrec'
  | 'scryfall'
  | 'cardkingdom'
  | 'tcgplayer';

interface Props {
  serviceName: ExternalService;
  displayName?: boolean;
  scryfall_uri?: string;
  cardName?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  asLink?: boolean;
  numberOfNotIncludedCards?: number;
}

export const PurchaseIcon = ({
  serviceName,
  cardName,
  displayName,
  style,
  label,
  scryfall_uri,
  asLink = true,
  numberOfNotIncludedCards,
}: Props) => {
  const frontCardName = cardName?.split(' // ')[0];
  const encodedName = encodeURI(frontCardName);

  const services = {
    cardkingdom: {
      icon: cardKingdomIcon,
      name: 'Card Kingdom',
      uri: `https://www.cardkingdom.com/catalog/search?search=header&filter%5Bname%5D=${encodedName}`,
    },
    cardmarket: {
      icon: mkmIcon,
      name: 'Cardmarket',
      uri: `https://www.cardmarket.com/en/Magic/Products/Singles?searchString=${encodedName}`,
    },
    edhrec: {
      icon: edhrecIcon,
      name: 'EDHREC',
      uri: `https://edhrec.com/route/?cc=${encodedName}`,
    },
    scryfall: {
      icon: scryfallIcon,
      name: 'Scryfall',
      uri: scryfall_uri ?? `https://scryfall.com/search?q=${encodedName}`,
    },
    tcgplayer: {
      icon: tcgplayer,
      name: 'TCGplayer',
      uri: `https://www.tcgplayer.com/search/all/product?q=${encodedName}`,
    },
  };

  const service = services[serviceName];
  if (!service) return null;

  const { icon, name, uri } = service;

  const body = (
    <StyledWrapper style={asLink ? undefined : style}>
      <StyledPurchaseIcon src={icon} alt={name} />
      {displayName && <span>{name}</span>}
      {label && <StyledLabel>{label}</StyledLabel>}
      {Boolean(numberOfNotIncludedCards) && (
        <Hint text={`No price available for ${numberOfNotIncludedCards} card(s)`} />
      )}
    </StyledWrapper>
  );

  if (!asLink) {
    return body;
  }

  return (
    <a
      href={uri}
      target="_blank"
      rel="noopener noreferrer"
      key={serviceName}
      style={style}
    >
      {body}
    </a>
  );
};
