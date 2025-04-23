import { Tooltip } from 'antd';
import React from 'react';

interface MultipleCardNamesProps {
  cardNames: (string | null)[];
}

const getCardNames = (cardNames: (string | null)[]): string[] => {
  const hasHiddenCard = cardNames.some((cardName) => !cardName);
  if (hasHiddenCard) {
    const name = cardNames.length === 1 ? 'a card' : `${cardNames.length} cards`;
    return [name];
  }
  return cardNames as string[];
};

const MultipleCardNames = ({ cardNames }: MultipleCardNamesProps) => {
  const cardNameStrings = getCardNames(cardNames);

  const firstDelimiter = cardNameStrings.length > 2 ? ', ' : ' and ';
  const cardLabel = cardNameStrings.length === 3 ? 'card' : 'cards';

  const tooltipContent = (
    <div>
      {cardNameStrings.slice(2).map((cardName, index) => (
        // The items can't change while this is rendered
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>{cardName}</div>
      ))}
    </div>
  );

  return (
    <span>
      <b>{cardNameStrings[0]}</b>
      {cardNameStrings.length > 1 && (
        <>
          <span>{firstDelimiter}</span>
          <b>{cardNameStrings[1]}</b>
        </>
      )}
      {cardNameStrings.length > 2 && (
        <>
          <span>{' and '}</span>
          <Tooltip title={tooltipContent}>
            <b>
              {cardNameStrings.length - 2} other {cardLabel}
            </b>
          </Tooltip>
        </>
      )}
    </span>
  );
};

export default MultipleCardNames;
