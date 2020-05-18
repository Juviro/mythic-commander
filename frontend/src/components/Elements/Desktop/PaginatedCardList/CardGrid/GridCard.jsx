import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

import FlippableCard from '../../../Shared/FlippableCard';
import { primary } from '../../../../../constants/colors';
import scrollIntoView from '../../../../../utils/scrollIntoView';
import { useShortcut, useToggle } from '../../../../Hooks';
import CardInfo from './CardInfo';
import { ContextMenu } from '../../../Shared';

const StyledCardWrapper = styled.div`
  padding: 8px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: ${({ widthPercentage }) => widthPercentage}%;
`;

const StyledContextMenu = styled.div`
  position: absolute;
  right: 8%;
  top: 11%;
  border-radius: 50%;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  transition: scale 0.2s;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  border-radius: 4%;
  background-color: black;

  ${({ isSelected }) =>
    isSelected ? `box-shadow: 0px 0px 6px 6px ${primary};` : ''}
`;

const StyledAmountWrapper = styled.div`
  padding: 1% 12px;
  position: absolute;
  background-color: #aebde6;
  opacity: 0.8;
  bottom: 0;
  align-self: flex-start;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const GridCard = ({
  card,
  onDeleteCard,
  onClick,
  isSelected,
  actions = [],
  widthPercentage,
  width,
  loading,
  zoom,
  search,
  onEditCard,
  shortcutsActive,
}) => {
  const displayedAmount = card.amount || card.totalAmount;
  const [showMenu, toggleShowMenu] = useToggle();
  useShortcut('DEL', shortcutsActive && onDeleteCard ? onDeleteCard : null);
  useShortcut('e', shortcutsActive && onEditCard ? onEditCard : null);
  const ref = useRef(null);

  useEffect(() => {
    if (!isSelected || !ref) return;
    scrollIntoView(ref.current);
  }, [isSelected]);

  const cardSize = { width, height: width * 1.39 };
  const textSize = Math.max(10 + 4 * (zoom / 100));

  return (
    <StyledCardWrapper
      key={card.id}
      widthPercentage={widthPercentage}
      ref={ref}
    >
      <StyledImageWrapper
        isSelected={isSelected}
        onClick={onClick}
        style={cardSize}
        onMouseMove={() => toggleShowMenu(true)}
        onMouseLeave={() => toggleShowMenu(false)}
      >
        <FlippableCard card={card} loading={loading} />
        {displayedAmount > 1 && (
          <StyledAmountWrapper
            style={{ fontSize: textSize }}
          >{`${displayedAmount}x`}</StyledAmountWrapper>
        )}
        {Boolean(showMenu && actions.length) && (
          <StyledContextMenu>
            <ContextMenu card={card} menuItems={actions} />
          </StyledContextMenu>
        )}
      </StyledImageWrapper>
      <CardInfo
        loading={loading}
        card={card}
        search={search}
        textSize={textSize}
        width={width}
      />
    </StyledCardWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.widthPercentage !== nextProps.widthPercentage) return false;
  if (prevProps.width !== nextProps.width) return false;
  if (prevProps.loading !== nextProps.loading) return false;
  if (prevProps.index !== nextProps.index) return false;
  if (prevProps.search !== nextProps.search) return false;
  if (prevProps.shortcutsActive !== nextProps.shortcutsActive) return false;

  return ['id', 'amount', 'owned', 'totalAmount', 'sumPrice', 'minPrice'].every(
    propKey => prevProps.card[propKey] === nextProps.card[propKey]
  );
};

export default React.memo(GridCard, areEqual);
