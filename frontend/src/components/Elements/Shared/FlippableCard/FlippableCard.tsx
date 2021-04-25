import React, { useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { SyncOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import './index.css';
import { UnifiedCard } from 'types/unifiedTypes';
import isMobile from 'utils/isMobile';
import { getImageUrl } from '../../../../utils/cardImage';
import CustomSkeleton from '../CustomSkeleton';
import CardButton from '../CardButton';
import { useToggle } from '../../../Hooks';

const StyledImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 0;
  padding-bottom: 139%;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 4%;
`;

interface Props {
  card: UnifiedCard;
  loading?: boolean;
  hideFlipIcon?: boolean;
  onFlipCard?: (isFlipped: boolean) => void;
}

export default ({
  loading,
  card,
  hideFlipIcon,
  onFlipCard: onFlipCardCallback,
}: Props) => {
  const { id, imgKey, isTwoFaced } = card || {};
  const [isFlipped, toggleIsFlipped] = useToggle(false);
  const [showHighResImage, toggleShowHighResImage] = useToggle(false);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(-${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const frontLargeSrc = imgKey && getImageUrl(id, imgKey, 'normal');

  useEffect(() => {
    if (isTwoFaced) return;
    toggleIsFlipped(false);
    // eslint-disable-next-line
  }, [isTwoFaced]);

  useEffect(() => {
    let isMounted = true;
    toggleShowHighResImage(false);
    if (frontLargeSrc) {
      const img = new Image();
      img.src = frontLargeSrc;
      img.onload = () => {
        if (!isMounted) return;
        toggleShowHighResImage(true);
      };
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [frontLargeSrc]);

  const onFlipCard = (e) => {
    e.stopPropagation();
    if (onFlipCardCallback) onFlipCardCallback(!isFlipped);
    toggleIsFlipped();
  };

  const frontImgSrc = getImageUrl(id, imgKey, showHighResImage ? 'normal' : 'small');

  return (
    <StyledImageWrapper>
      <CustomSkeleton.CardImage style={{ position: 'absolute', top: 0 }} />
      {isTwoFaced && showHighResImage && (
        <>
          {!hideFlipIcon && (
            <CardButton
              Icon={SyncOutlined}
              index={1}
              onClick={onFlipCard}
              // On Desktop devices, this button needs to be over
              // the grid card overlay that displays on hover
              zIndex={!isMobile() ? 11 : undefined}
            />
          )}
          <a.img
            className="flippable-card "
            style={{
              opacity,
              transform: transform.interpolate((t) => `${t} rotateY(-180deg)`),
            }}
            src={getImageUrl(id, imgKey, 'normal', 'back')}
          />
        </>
      )}
      {!loading && (
        <a.img
          alt={card.name}
          className="flippable-card"
          style={
            isTwoFaced
              ? {
                  opacity: opacity.interpolate((o: number) => 1 - o),
                  transform,
                }
              : undefined
          }
          src={frontImgSrc}
        />
      )}
    </StyledImageWrapper>
  );
};