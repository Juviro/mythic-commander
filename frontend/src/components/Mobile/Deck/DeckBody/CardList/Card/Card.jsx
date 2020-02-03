import React from 'react';

import { isCardLegal } from '../../../../../../utils/cardStats';
import CardMenu from './CardMenu';
import NotLegalWarning from './Warning';
import CardListItem from '../../../../../Elements/CardListItem';

const Card = ({ card, commander, setOpenCardId, isOpen }) => {
  const isLegal = isCardLegal(card, commander);
  const showWarning = !isLegal || !card.owned;

  const cardBody = (
    <CardMenu card={card} isVisible={isOpen} isLegal={isLegal} />
  );
  const additionalIcon = showWarning ? (
    <NotLegalWarning card={card} isOpen={isOpen} isLegal={isLegal} />
  ) : null;

  return (
    <CardListItem
      card={card}
      setOpenCardId={setOpenCardId}
      isOpen={isOpen}
      cardBody={cardBody}
      additionalIcon={additionalIcon}
    />
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  if (
    (prevProps.commander || {}).oracle_id !==
    (nextProps.commander || {}).oracle_id
  ) {
    return false;
  }
  return ['id', 'set', 'zone', 'owned', 'amount'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(Card, areEqual);
