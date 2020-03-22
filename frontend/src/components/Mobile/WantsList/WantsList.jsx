import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { StringParam, useQueryParam } from 'use-query-params';
import { SaveOutlined } from '@ant-design/icons';
import {
  wantsList as wantsListQuery,
  deleteFromWantsList,
  changeWantsListAmount,
} from './queries';

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
  const [mutateAmount] = useMutation(changeWantsListAmount);
  const [layout] = useQueryParam('layout', StringParam);
  const [changedAmount, setChangedAmount] = useState({});
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

  const onChangeAmount = (cardId, val) => {
    setChangedAmount({
      ...changedAmount,
      [cardId]: Math.max(val, 1),
    });
  };

  const onSaveChanges = () => {
    const updatedCards = Object.keys(changedAmount).map(key => ({
      id: key,
      amount: changedAmount[key],
    }));
    const optimisticCards = cards
      .filter(card => Boolean(changedAmount[card.id]))
      .map(card => ({
        ...card,
        amount: changedAmount[card.id],
      }));

    mutateAmount({
      variables: { wantsListId: id, cards: updatedCards },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        changeWantsListAmount: optimisticCards,
      }),
    });
    setChangedAmount({});
  };

  const onResetEditing = () => {
    setChangedAmount({});
    setIsEditing(false);
  };

  const hasChanges = Boolean(Object.keys(changedAmount).length);

  return (
    <StyledWrapper>
      <Header wantsList={wantsList} />
      <ListOrder showCollectionFilters />
      <Divider />
      {canEdit && (
        <EditIcon
          editingText={hasChanges ? 'Save' : 'Back'}
          editingIcon={SaveOutlined}
          onDiscard={hasChanges ? onResetEditing : undefined}
          onClick={() => {
            if (isEditing && hasChanges) onSaveChanges();
            setIsEditing(!isEditing);
          }}
          isEditing={isEditing}
        />
      )}
      <FilteredCardList
        cards={cards}
        isEditing={isEditing}
        loading={loading}
        basePath={basePath}
        onChangeAmount={onChangeAmount}
        onDeleteElement={isEditing ? onDeleteWant : undefined}
      />
      <AddWants containedCards={cards} />
      <CardModal basePath={basePath} />
    </StyledWrapper>
  );
};
