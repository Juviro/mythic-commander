import React, { useContext, useEffect, useState } from 'react';

import { ActivePlane } from 'backend/database/gamestate.types';
import { getImageUrl } from 'utils/getImageUrl';

import classNames from 'classnames';
import CardPositionContext from 'components/Game/CardPositionContext';
import styles from './Planechase.module.css';

const FADE_DURATION = 1000;

interface PlanechaseImageProps {
  activePlane: ActivePlane;
}

const PlanechaseImage = ({ activePlane }: PlanechaseImageProps) => {
  const [lastPlane, setLastPlane] = useState<ActivePlane | null>(null);
  const { hoveredCard, setHoveredCard } = useContext(CardPositionContext);

  //  Make sure the cards preview updates
  useEffect(() => {
    if (!activePlane?.clashId) return;
    if (hoveredCard?.clashId !== lastPlane?.clashId) return;

    setHoveredCard(activePlane);
  }, [activePlane?.clashId]);

  useEffect(() => {
    setTimeout(() => {
      setLastPlane(activePlane);
    }, FADE_DURATION);
  }, [activePlane]);

  return (
    <div className={styles.image_wrapper}>
      <img className={styles.image} src={getImageUrl(activePlane.id)} />
      {lastPlane && lastPlane?.clashId !== activePlane.clashId && (
        <img
          className={classNames(styles.image, styles.fading_image)}
          src={getImageUrl(lastPlane?.id)}
        />
      )}
    </div>
  );
};

export default PlanechaseImage;
