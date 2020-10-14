import React from 'react';
import { Modal } from 'antd';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined } from '@ant-design/icons';

import { wantedCards as wantedCardsQuery } from './queries';
import Flex from '../Flex';
import FoundCards from './FoundCards';

const getDistinctCards = (wantedCards) => {
  if (!wantedCards) return [];

  const { decks, wantsLists } = wantedCards;
  const allCards = [...decks, ...wantsLists].map(({ cards }) => cards).flat();

  return allCards.filter(
    ({ id }, index) => allCards.findIndex((card) => card.id === id) === index
  );
};

export default ({ onClose }) => {
  const { username } = useParams();
  const { data, loading } = useQuery(wantedCardsQuery, {
    variables: { username },
  });
  const wantedCards = data?.wantedCards;
  const distinctCards = getDistinctCards(wantedCards);
  const numberOfCards = distinctCards.length;

  const title = loading
    ? 'Searching for cards...'
    : `${username} owns ${numberOfCards} cards you need:`;

  return (
    <Modal visible onCancel={onClose} title={title} footer={null} style={{ top: 20 }}>
      {loading ? (
        <Flex align="center" justify="center">
          <LoadingOutlined style={{ fontSize: 34 }} />
        </Flex>
      ) : (
        <FoundCards wantedCards={wantedCards} distinctCards={distinctCards} />
      )}
    </Modal>
  );
};
