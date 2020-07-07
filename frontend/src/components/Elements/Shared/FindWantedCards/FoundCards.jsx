import React from 'react';
import { Divider, Empty } from 'antd';

import Flex from '../Flex';
import CardsList from './CardsList';
import ExportCards from './ExportCards';

export default ({ wantedCards, distinctCards }) => {
  const { decks, wantsLists } = wantedCards;
  const hasResults = Boolean(decks.length + wantsLists.length);

  if (!hasResults) {
    return (
      <Empty
        style={{ width: '100%' }}
        description="No cards found"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <Flex direction="column">
      <Divider style={{ marginTop: 0 }}>Export</Divider>
      <ExportCards cards={distinctCards} />
      {Boolean(decks.length) && (
        <>
          <Divider>Decks</Divider>
          {decks.map(deck => (
            <CardsList key={deck.id} list={deck} />
          ))}
        </>
      )}
      {Boolean(wantsLists.length) && (
        <>
          <Divider>Wants</Divider>
          {wantsLists.map(wantsList => (
            <CardsList key={wantsList.id} list={wantsList} />
          ))}
        </>
      )}
    </Flex>
  );
};
