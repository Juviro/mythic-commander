import React from 'react';
import CardListItem from '../../../Elements/CardListItem';

const Card = ({ card, setOpenCardId, isOpen }) => {
  return (
    <CardListItem card={card} setOpenCardId={setOpenCardId} isOpen={isOpen} />
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  return ['id', 'amount', 'isFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(Card, areEqual);
