import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Spin, Collapse } from 'antd';
import styled from 'styled-components';

import { RightOutlined } from '@ant-design/icons';
import Flex from '../Flex';
import { allLists } from './queries';
import Lists from './Lists';
import SimpleCardsList from '../SimpleCardsList';
import { addCardsToDeckDesktop } from '../../../Desktop/Deck/queries';
import message from '../../../../utils/message';
import { addToCollectionDesktop } from '../../../Desktop/Collection/queries';
import {
  addCardsToWantsListDesktop,
  wantsListDesktop,
} from '../../../Desktop/WantsList/queries';
import sumCardAmount from '../../../../utils/sumCardAmount';
import FocusedModal from '../FocusedModal';
import CheckableCardlist from '../CheckableCardlist/CheckableCardlist';
import ButtonGroup from '../ButtonGroup/ButtonGroup';

export const StyledCollapse = styled(Collapse)`
  && {
    border: none;
    background-color: white;
  }
  &.ant-collapse-content {
    border-top: none;
  }
  &.ant-collapse-item {
    border-bottom: none;
  }
`;

const formatCards = cards =>
  cards.map(({ id, amount, totalAmount }) => ({
    id,
    amount: amount || totalAmount || 1,
  }));

export default ({ onSubmit, cardsToAdd, loading }) => {
  const [addToDeck] = useMutation(addCardsToDeckDesktop);
  const [addToWantsList] = useMutation(addCardsToWantsListDesktop);
  const [addToCollection] = useMutation(addToCollectionDesktop);

  const [selectedCardIds, setSelectedCardIds] = useState([]);

  useEffect(() => {
    if (selectedCardIds.length || !cardsToAdd.length) return;
    setSelectedCardIds(cardsToAdd.map(({ id }) => id));
  }, [cardsToAdd]);

  const onAddToDeck = (deckId, deckName) => {
    addToDeck({
      variables: { cards: formatCards(cardsToAdd), deckId },
    });
    onSubmit();
    const numberOfCards = sumCardAmount;
    message(`Added <b>${numberOfSelectedCards}</b> cards to <b>${deckName}</b>!`);
  };
  const onAddToWantsList = (wantsListId, wantsListName) => {
    addToWantsList({
      variables: { cards: formatCards(cardsToAdd), wantsListId },
      refetchQueries: [
        {
          query: wantsListDesktop,
          variables: { id: wantsListId },
        },
      ],
    });
    onSubmit();
    message(`Added <b>${numberOfSelectedCards}</b> cards to <b>${wantsListName}</b>!`);
  };
  const onAddToCollection = cards => {
    const formattedCollectionCards = cards.map(({ id, amount, totalAmount }) => ({
      id,
      amount: amount || totalAmount || 1,
    }));
    addToCollection({
      variables: { cards: formattedCollectionCards },
      refetchQueries: ['paginatedCollection', 'ownedCardNames'],
    });
    onSubmit();
    message(`Added ${sumCardAmount(cards)} cards to your collection!`);
  };

  return (
    <Flex direction="row">
      <ButtonGroup buttons={[]} />
    </Flex>
  );
};
