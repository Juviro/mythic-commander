import { List } from 'antd';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { UnifiedDeckCard } from 'types/unifiedTypes';
import { ManaCost, PreviewCardImage } from 'components/Elements/Shared';
import { primaryLight } from 'constants/colors';
import scrollIntoView from 'utils/scrollIntoView';

const StyledListItem = styled(List.Item)<{ isSelected: boolean }>`
  padding: 2px 0;
  ${({ isSelected }) => isSelected && `background-color: ${primaryLight}`}
`;
interface Props {
  card: UnifiedDeckCard;
  isSelected: boolean;
}

const Card = ({ card, isSelected }: Props) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!isSelected || !ref) return;
    scrollIntoView(ref.current);
  }, [isSelected]);

  return (
    <StyledListItem isSelected={isSelected}>
      <List.Item.Meta
        style={{ overflow: 'hidden' }}
        avatar={<PreviewCardImage card={card} highlightOnHover />}
        title={card.name}
        description={<ManaCost costString={card.mana_cost} size={14} />}
      />
    </StyledListItem>
  );
};

// const areEqual = (prevProps: Props, nextProps: Props) => {
//   const USED_PROPERTIES = ['id', 'amount', 'owned', 'sumPrice', 'minPrice'];

//   return USED_PROPERTIES.every(
//     (propKey) => prevProps.card[propKey] === nextProps.card[propKey]
//   );
// };

// export default React.memo(Card, areEqual);
export default Card;
