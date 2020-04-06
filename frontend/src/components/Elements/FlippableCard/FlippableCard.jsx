import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { SyncOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import './index.css';
import { getImageUrl } from '../../../utils/cardImage';
import CustomSkeleton from '../CustomSkeleton';
import CardButton from '../CardButton/CardButton';

const StyledImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export default ({ loading, card, hideFlipIcon }) => {
  const { id, imgKey, isTwoFaced } = card || {};
  const [flipped, setFlipped] = useState(false);
  const [showHighResImage, setShowHighResImage] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(-${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const frontLargeSrc = imgKey && getImageUrl(id, imgKey, 'normal');

  useEffect(() => {
    let isMounted = true;
    setShowHighResImage(false);
    if (frontLargeSrc) {
      const img = new Image();
      img.src = frontLargeSrc;
      img.onload = () => {
        if (!isMounted) return;
        setShowHighResImage(true);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [frontLargeSrc]);

  const onFlipCard = e => {
    e.stopPropagation();
    setFlipped(state => !state);
  };

  const frontImgSrc = getImageUrl(
    id,
    imgKey,
    showHighResImage ? 'normal' : 'small'
  );

  return (
    <StyledImageWrapper>
      {(loading || !showHighResImage) && <CustomSkeleton.CardImage />}
      {isTwoFaced && showHighResImage && (
        <>
          {!hideFlipIcon && (
            <CardButton Icon={SyncOutlined} index={1} onClick={onFlipCard} />
          )}
          <a.div
            className="flippable-card "
            style={{
              opacity,
              transform: transform.interpolate(t => `${t} rotateY(-180deg)`),
              backgroundImage: `url(${getImageUrl(
                id,
                imgKey,
                'normal',
                'back'
              )})`,
            }}
          />
        </>
      )}
      {!loading && (
        <a.div
          className="flippable-card"
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform,
            backgroundImage: `url(${frontImgSrc})`,
          }}
        />
      )}
    </StyledImageWrapper>
  );
};
