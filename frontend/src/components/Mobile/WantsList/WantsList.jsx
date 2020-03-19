import React, { useState } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo';
import { useParams } from 'react-router';
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
  const { data } = useQuery(wantsListQuery, { variables: { id } });
  const [mutate] = useMutation(deleteFromWantsList);

  const [isEditing, setIsEditing] = useState(false);
  const cards = data && data.wantsList.cards;
  const basePath = `/m/wants/${id}`;
  const wantsList = data && data.wantsList;

  const onDeleteWant = cardId => {
    mutate({
      variables: { cardId, wantsListId: id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
          ...wantsList,
          cards: wantsList.cards.filter(card => card.id !== cardId),
        },
      }),
    });
  };

  return (
    <StyledWrapper>
      <Header wantsList={wantsList} />
      <ListOrder showCollectionFilters />
      <Divider />
      <EditIcon
        onClick={() => setIsEditing(!isEditing)}
        isEditing={isEditing}
      />
      <FilteredCardList
        cards={cards}
        basePath={basePath}
        onDeleteElement={isEditing ? onDeleteWant : undefined}
      />
      <AddWants />
      <CardModal basePath={basePath} />
    </StyledWrapper>
  );
};
