import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
import styled from 'styled-components';
import { Icon } from 'antd';
import './index.css';

const StyledImageWrapper = styled.div`
  display: flex;
  width: 90vw;
  height: 120vw;
  margin-top: 12vw;
  justify-content: center;
  align-items: center;
`;

const StyledFlipIcon = styled(Icon)`
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

export default ({ loading, cardImages }) => {
  const [flipped, setFlipped] = useState(false);
  const [showHighResImage, setShowHighResImage] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(-${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const frontLargeSrc = !loading && cardImages && cardImages[0].normal;

  useEffect(() => {
    setShowHighResImage(false);
    if (!frontLargeSrc) return;
    const img = new Image();
    img.src = frontLargeSrc;
    img.onload = () => {
      setShowHighResImage(true);
    };
  }, [frontLargeSrc]);

  const frontImgSrc =
    cardImages &&
    (showHighResImage ? cardImages[0].normal : cardImages[0].small);

  return (
    <StyledImageWrapper>
      {!showHighResImage && <StyledPlaceholder />}
      {cardImages && cardImages.length > 1 && (
        <>
          <StyledFlipIcon
            type="sync"
            size="large"
            shape="circle"
            onClick={() => setFlipped(state => !state)}
          />
          <a.div
            className="c front"
            style={{
              opacity,
              transform: transform.interpolate(t => `${t} rotateY(-180deg)`),
              backgroundImage: `url(${cardImages[1].normal})`,
            }}
          />
        </>
      )}
      {!loading && (
        <a.div
          className="c back"
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
