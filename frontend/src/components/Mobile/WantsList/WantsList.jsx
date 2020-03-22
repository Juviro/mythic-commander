import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { StringParam, useQueryParam } from 'use-query-params';
import { wantsList as wantsListQuery, deleteFromWantsList } from './queries';

import Header from './Header';
import AddWants from './AddWants';
import CardModal from '../Card/CardModal';
import { ListOrder, EditIcon } from '../../Elements';
import FilteredCardList from '../../Elements/CardList/FilteredCardList';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(wantsListQuery, { variables: { id } });
  const [mutate] = useMutation(deleteFromWantsList);
  const [layout] = useQueryParam('layout', StringParam);

  const [isEditing, setIsEditing] = useState(false);
  const cards = data && data.wantsList.cards;
  const basePath = `/m/wants/${id}`;
  const wantsList = data && data.wantsList;
  const canEdit = !layout || layout === 'list';

  useEffect(() => {
    if (!canEdit) setIsEditing(false);
  }, [canEdit]);

  const onDeleteWant = cardId => {
    const newCards = wantsList.cards.filter(card => card.id !== cardId);
    const newNumberOfCards = wantsList.numberOfCards;
    mutate({
      variables: { cardId, wantsListId: id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
          ...wantsList,
          cards: newCards,
          numberOfCards: newNumberOfCards,
        },
      }),
    });
  };

  useEffect(() => {
    if (!loading) return;
    setTimeout(() => window.scrollTo(0, 0), 100);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <StyledWrapper>
      <Header wantsList={wantsList} />
      <ListOrder showCollectionFilters />
      <Divider />
      {canEdit && (
        <EditIcon
          onClick={() => setIsEditing(!isEditing)}
          isEditing={isEditing}
        />
      )}
      <FilteredCardList
        cards={cards}
        loading={loading}
        basePath={basePath}
        onDeleteElement={isEditing ? onDeleteWant : undefined}
      />
      <AddWants containedCards={cards} />
      <CardModal basePath={basePath} />
    </StyledWrapper>
  );
};
