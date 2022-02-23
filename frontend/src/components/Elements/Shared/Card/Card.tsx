import React from 'react';
import styled from 'styled-components';
import CustomSkeleton from 'components/Elements/Shared/CustomSkeleton';
import FlippableCard from 'components/Elements/Shared/FlippableCard';
import { UnifiedCard } from 'types/unifiedTypes';
import { getImageUrl } from 'utils/cardImage';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 0;
  padding-bottom: 139%;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 4%;
`;

const StyledCard = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
`;

interface Props {
  loading?: boolean;
  card?: UnifiedCard;
  hideFlipIcon?: boolean;
  onFlipCard?: (isFlipped: boolean) => void;
}

const Card = (props: Props) => {
  const { loading, card } = props;

  const cardComponent = card.isTwoFaced ? (
    <FlippableCard {...props} />
  ) : (
    <StyledCard src={getImageUrl(card.id, card.imgKey, 'normal')} alt={card.name} />
  );

  return (
    <StyledWrapper>
      <CustomSkeleton.CardImage style={{ position: 'absolute', top: 0 }} />
      {!loading && cardComponent}
    </StyledWrapper>
  );
};

export default Card;
