import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { editDeck } from '../../../../../queries/deck';
import Stats from './Stats';
import DeckImage from './Image';
import DeckName from './Name';

const StyledDeckProfile = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
`;

export default ({ deck }) => {
  const [mutate] = useMutation(editDeck);
  if (!deck) return null;

  const onChangeDeck = key => value => {
    if (!key) return;
    mutate({
      variables: {
        deckId: deck.id,
        newProperties: {
          [key]: value,
        },
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        editDeck: {
          ...deck,
          [key]: value,
        },
      }),
    });
  };

  return (
    <StyledDeckProfile>
      <Top>
        <DeckImage deck={deck} onChangeImage={onChangeDeck('imgSrc')} />
        <Stats deck={deck} />
      </Top>
      <DeckName name={deck.name} onChangeName={onChangeDeck('name')} />
    </StyledDeckProfile>
  );
};
