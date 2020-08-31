import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useDrop } from 'react-dnd';

import { WantsList, CardInputType } from 'types/graphql';
import { dropZoneStyle } from 'components/Elements/Desktop/Dropzone/Dropzone';
import { Flex } from 'components/Elements/Shared';
import { UnifiedDeck } from '../../Deck';
import DeckWantsList from './DeckWantsList';
import WantsListElement from './WantsListElement';

interface Props {
  wantsLists: WantsList[];
  deck?: UnifiedDeck;
  onAddCards: (newCards: CardInputType[], name: string) => void;
}

const StyledPanel = styled(Collapse.Panel)`
  .ant-collapse-header:before,
  .ant-collapse-header:after {
    content: none !important;
  }
`;

const StyledDropzone = styled.div`
  background-color: red;
  opacity: 0.2;
  user-select: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${dropZoneStyle}
`;

export default ({ wantsLists, deck, onAddCards }: Props) => {
  const [activePanelKey, setActivePanelKey] = useState<string | null>(null);
  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'CARD',
    drop: console.log,

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(), // && monitor.getItem().listId !== wantsList.id,
    }),
  });
  console.log('isOver, canDrop :', isOver, canDrop);

  const onClickPanel = (panelId: string) => {
    if (activePanelKey === panelId) {
      setActivePanelKey(null);
    } else {
      setActivePanelKey(panelId);
    }
  };

  return (
    <Flex direction="column" style={{ width: '100%', height: '100%' }}>
      {wantsLists.map((wantsList) => (
        <WantsListElement
          wantsList={wantsList}
          alreadyInDeck={alreadyInDeck}
          onAddCards={onAddCards}
          active={activePanelKey === wantsList.id}
          onClick={() => onClickPanel(wantsList.id)}
        />
      ))}
    </Flex>
  );
};
