import React from 'react';
import { useSpring, animated as a } from 'react-spring';
import { SyncOutlined } from '@ant-design/icons';

import './index.css';
import { UnifiedCard } from 'types/unifiedTypes';
import isMobile from 'utils/isMobile';
import { getImageUrl } from '../../../../utils/cardImage';
import CardButton from '../CardButton';
import { useToggle } from '../../../Hooks';

interface Props {
  card?: UnifiedCard;
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

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(-${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const onFlipCard = (e) => {
    e.stopPropagation();
    if (onFlipCardCallback) onFlipCardCallback(!isFlipped);
    toggleIsFlipped();
  };

  const frontImgSrc = getImageUrl(id, imgKey, 'normal');

  return (
    <>
      {isTwoFaced && (
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
    </>
  );
};
