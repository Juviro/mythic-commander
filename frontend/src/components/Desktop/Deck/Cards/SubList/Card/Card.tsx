import { List } from 'antd';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { UnifiedDeckCard } from 'types/unifiedTypes';
import { ManaCost, PreviewCardImage } from 'components/Elements/Shared';
import { primaryLight } from 'constants/colors';
import scrollIntoView from 'utils/scrollIntoView';
import DeckCardActions from 'components/Desktop/Deck/Cards/SubList/Card/DeckCardActions';

const StyledListItem = styled(List.Item)<{ isSelected: boolean }>`
  padding: 2px 0;
  cursor: pointer;
  ${({ isSelected }) => isSelected && `background-color: ${primaryLight};`}

  &:hover .deck-card-actions {
    display: inherit;
  }
`;

interface Props {
  card: UnifiedDeckCard;
  isSelected: boolean;
  onOpenDetails: (cardId: string) => void;
  onDelete: () => void;
}

const Card = ({ card, isSelected, onOpenDetails, onDelete }: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isSelected || !ref) return;
    scrollIntoView(ref.current);
  }, [isSelected]);

  return (
    <StyledListItem
      isSelected={isSelected}
      extra={
        <DeckCardActions
          scrollRef={ref}
          card={card}
          onDelete={onDelete}
          isSelected={isSelected}
        />
      }
      onClick={() => onOpenDetails(card.oracle_id)}
    >
      <List.Item.Meta
        style={{ overflow: 'hidden' }}
        avatar={<PreviewCardImage card={card} highlightOnHover />}
        title={card.name}
        description={<ManaCost costString={card.mana_cost} size={14} />}
      />
    </StyledListItem>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;

  const USED_PROPERTIES = ['id', 'amount', 'owned', 'sumPrice', 'minPrice'];

  return USED_PROPERTIES.every(
    (propKey) => prevProps.card[propKey] === nextProps.card[propKey]
  );
};

export default React.memo(Card, areEqual);
