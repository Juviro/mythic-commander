import React, { useState } from 'react';

import { WantsList, CardInputType } from 'types/graphql';
import { Flex, OneTimeInfoBox } from 'components/Elements/Shared';
import { UnifiedDeck } from '../../Deck';
import WantsListElement from './WantsListElement';
import AddWantsList from './AddWantsList';

interface Props {
  wantsLists: WantsList[];
  deck?: UnifiedDeck;
  onAddCards: (newCards: CardInputType[], name: string) => void;
}

export default ({ wantsLists, deck, onAddCards }: Props) => {
  const [activePanelKey, setActivePanelKey] = useState<string | null>(null);
  const cardNames = deck && deck.cards.map(({ name }) => name);
  const alreadyInDeck = ({ name }) => cardNames && cardNames.includes(name);

  const onClickPanel = (panelId: string) => {
    if (activePanelKey === panelId) {
      setActivePanelKey(null);
    } else {
      setActivePanelKey(panelId);
    }
  };

  return (
    <Flex direction="column" style={{ width: '100%', height: '100%' }}>
      <OneTimeInfoBox
        showIcon
        id="deck.wants.drag"
        style={{ marginTop: 16 }}
        description="Drag and drop cards to add them to your Deck or other Wants Lists"
      />
      {wantsLists.map((wantsList) => (
        <WantsListElement
          key={wantsList.id}
          wantsList={wantsList}
          alreadyInDeck={alreadyInDeck}
          onAddCards={onAddCards}
          active={activePanelKey === wantsList.id}
          onClick={() => onClickPanel(wantsList.id)}
        />
      ))}
      <AddWantsList />
    </Flex>
  );
};
