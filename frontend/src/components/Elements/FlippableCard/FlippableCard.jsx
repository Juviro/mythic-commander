import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { SyncOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './index.css';
import { getImageUrl } from '../../../utils/cardImage';

const StyledImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const StyledFlipIcon = styled(SyncOutlined)`
  z-index: 10;
  right: -35%;
  top: -10%;
  border: none;
  opacity: 0.7;
  background-color: #9c9c9c;
  border-radius: 50%;
  font-size: 6vw;
  padding: 2vw;
  position: relative;
  display: inline-block;
`;

const StyledPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-size: 400% 100%;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  animation: ant-skeleton-loading 1.4s ease infinite;
`;

export default ({ loading, card }) => {
  const { id, imgKey, isTwoFaced } = card || {};
  const [flipped, setFlipped] = useState(false);
  const [showHighResImage, setShowHighResImage] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(-${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const frontLargeSrc = !loading && getImageUrl(id, imgKey, 'normal');

  useEffect(() => {
    setShowHighResImage(false);
    if (!frontLargeSrc) return;
    const img = new Image();
    img.src = frontLargeSrc;
    img.onload = () => {
      setShowHighResImage(true);
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
      {!showHighResImage && <StyledPlaceholder />}
      {isTwoFaced && (
        <>
          <StyledFlipIcon size="large" shape="circle" onClick={onFlipCard} />
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
