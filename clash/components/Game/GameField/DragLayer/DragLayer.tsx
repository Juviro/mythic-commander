import React from 'react';
import { useDragLayer } from 'react-dnd';

import { DndItemTypes, DropCardGroup } from 'types/dnd.types';
import { VisibleBattlefieldCard } from 'backend/database/gamestate.types';
import DragLayerCard from './DragLayerCard';
import DragLayerCardGroup from './DragLayerCardGroup';

const DragLayer = () => {
  const { isDragging, item, currentOffset, itemType } = useDragLayer((monitor) => ({
    item: monitor.getItem() as VisibleBattlefieldCard | DropCardGroup,
    itemType: monitor.getItemType() as DndItemTypes,
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!item || !currentOffset || !isDragging) {
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
      <DragLayerCardGroup group={item as DropCardGroup} currentOffset={currentOffset} />
    );
  }

  return null;
};

export default DragLayer;
