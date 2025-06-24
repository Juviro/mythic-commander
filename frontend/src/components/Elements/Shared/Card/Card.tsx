import React from 'react';
import styled from 'styled-components';
import CustomSkeleton from 'components/Elements/Shared/CustomSkeleton';
import FlippableCard from 'components/Elements/Shared/FlippableCard';
import { UnifiedCard } from 'types/unifiedTypes';
import { getImageUrl } from 'utils/cardImage';
import { secondary } from 'constants/colors';
import { LandsSuggestionCard } from 'types/graphql';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 0;
  padding-bottom: 139%;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 4%;
  container-type: inline-size;
  overflow: hidden;
`;

const StyledCard = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
`;

const StyledGameChanger = styled.div`
  position: absolute;
  font-size: 6cqw;
  top: 20cqw;
  left: 26cqw;
  transform: rotate(45deg);
  background-color: ${secondary};
  opacity: 0.8;
  padding: 2px;
  color: white;
  display: flex;
  white-space: nowrap;
  width: 100%;
  justify-content: center;
`;

interface Props {
  loading?: boolean;
  card?: UnifiedCard | LandsSuggestionCard;
  hideFlipIcon?: boolean;
  onFlipCard?: (isFlipped: boolean) => void;
}

const Card = (props: Props) => {
  const { loading, card } = props;

  const cardComponent =
    'isTwoFaced' in card && card.isTwoFaced ? (
      <FlippableCard {...props} card={card as UnifiedCard} />
    ) : (
      <StyledCard src={getImageUrl(card.id, null, 'normal')} alt={card.name} />
    );

  return (
    <StyledWrapper>
      <CustomSkeleton.CardImage style={{ position: 'absolute', top: 0 }} />
      {!loading && cardComponent}
      {'game_changer' in card && card.game_changer && (
        <StyledGameChanger>Game Changer</StyledGameChanger>
      )}
    </StyledWrapper>
  );
};

export default Card;
