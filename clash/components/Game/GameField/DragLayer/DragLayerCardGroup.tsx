import React, { CSSProperties, useContext, useEffect } from 'react';
import { DropCardGroup } from 'types/dnd.types';
import { createPortal } from 'react-dom';

import GameStateContext from 'components/Game/GameStateContext';
import { XYCoord } from 'react-dnd';
import CardPositionContext from 'components/Game/CardPositionContext';
import SelectionRectangle from '../PlayerInterface/Battlefield/BattlefieldSelection/SelectionRectangle';

import styles from './DragLayerCardGroup.module.css';
import { getGridAlign } from './useCardDragAlign';

interface Props {
  group: DropCardGroup;
  currentOffset: XYCoord;
}

const DragLayerCardGroup = ({ group, left, top, currentOffset }: Props) => {
  return null;
};

export default DragLayerCardGroup;
