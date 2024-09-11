import React, { useContext, useEffect } from 'react';
import { useDragLayer } from 'react-dnd';

import { DndItemTypes, DropCardGroup } from 'types/dnd.types';
import { VisibleBattlefieldCard } from 'backend/database/gamestate.types';
import CardPositionContext from 'components/Game/CardPositionContext';
import DragLayerCard from './DragLayerCard';
import DragLayerCardGroup from './DragLayerCardGroup';

type DropType = (VisibleBattlefieldCard & { noPreview?: boolean }) | DropCardGroup;

const DragLayer = () => {
  const { snapChoords } = useContext(CardPositionContext);

  const { isDragging, item, currentOffset, itemType, differenceFromInitialOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem() as DropType,
      itemType: monitor.getItemType() as DndItemTypes,
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
      differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    }));

  const isPreview = item && 'noPreview' in item && item.noPreview;

  // list cards don't snap to the grid, so we need to reset the snap coords
  useEffect(() => {
    if (itemType !== DndItemTypes.LIST_CARD && !isPreview) {
      return;
    }

    snapChoords.current = {};
  }, [itemType]);

  if (
    !item ||
    isPreview ||
    !currentOffset ||
    !isDragging ||
    !differenceFromInitialOffset
  ) {
    return null;
  }

  if (itemType === DndItemTypes.CARD) {
    return (
      <DragLayerCard
        item={item as VisibleBattlefieldCard}
        currentOffset={currentOffset}
      />
    );
  }

  if (itemType === DndItemTypes.CARD_GROUP) {
    return (
      <DragLayerCardGroup
        group={item as DropCardGroup}
        differenceFromInitialOffset={differenceFromInitialOffset}
      />
    );
  }

  return null;
};

export default DragLayer;
