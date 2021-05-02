import React from 'react';
import { Space } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { CardInputType } from 'types/graphql';
import { UnifiedCard, UnifiedDeck, UnifiedWantsList } from 'types/unifiedTypes';
import { wantsListDesktop } from 'components/Desktop/WantsList/queries';
import unifyCardFormat from 'utils/unifyCardFormat';
import { FadeIn, OneTimeInfoBox } from 'components/Elements/Shared';
import { AddCards, Dropzone } from 'components/Elements/Desktop';
import { Title } from 'components/Desktop/Deck/Sidebar/DeckWants/Title';
import DeckWantsList from './DeckWantsList';
import useDeckWantsQueries from './useDeckWantsQueries';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {
  name: string;
  deck: UnifiedDeck;
  id: string;
  numberOfCards?: number;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  onDeleteWantsList: () => void;
}

export default ({
  name,
  deck,
  id,
  onAddCards,
  numberOfCards,
  onDeleteWantsList,
}: Props) => {
  const { data } = useQuery(wantsListDesktop, {
    variables: { id },
    fetchPolicy: 'cache-first',
  });

  const cards = data && unifyCardFormat(data.wantsList.cards);
  const wantsList: UnifiedWantsList = data && {
    ...data.wantsList,
    originalCards: data.wantsList.cards,
    cards,
  };

  const {
    onDeleteCard,
    onAddCard: onAddCardToWantsList,
    onDeletebyOracle,
    onEditCard,
  } = useDeckWantsQueries(wantsList);

  return (
    <FadeIn style={{ height: '100%', padding: 16 }}>
      <Dropzone
        onDrop={(val) => onAddCardToWantsList(val, null)}
        listId={wantsList?.id}
        style={{ height: 'unset', minHeight: '100%' }}
      >
        <StyledWrapper>
          <Title
            id={id}
            name={name}
            wantsList={wantsList}
            onAddCards={onAddCards}
            numberOfCards={numberOfCards}
            onDeleteWantsList={onDeleteWantsList}
          />
          <Space direction="vertical" size={48} style={{ width: '100%' }}>
            <AddCards
              isAdvanced={false}
              onAddCards={(card: UnifiedCard, cardName: string) =>
                onAddCardToWantsList(card[0], cardName)
              }
              focusId="deck.cards"
              placeholder="Add a card..."
              containedCardNames={wantsList?.cards.map((card) => card.name)}
            />
            <OneTimeInfoBox
              showIcon
              id="deck.wants.drag"
              style={{ marginTop: 16 }}
              // eslint-disable-next-line max-len
              description="Drag and drop cards to add them to your Deck or other Wants Lists"
            />
            <DeckWantsList
              wantsList={wantsList}
              deck={deck}
              onAddCardsToDeck={onAddCards}
              onDeleteCard={onDeleteCard}
              // @ts-ignore
              onEditCard={onEditCard}
              onDeletebyOracle={onDeletebyOracle}
            />
          </Space>
        </StyledWrapper>
      </Dropzone>
    </FadeIn>
  );
};
