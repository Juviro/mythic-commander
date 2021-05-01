import React, { useEffect, useRef, useState } from 'react';

import { CardGrid } from 'components/Elements/Shared';
import { EdhRecCategory } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { Divider, Space } from 'antd';
import scrollIntoView from 'utils/scrollIntoView';
import { CategorySelection } from './CategorySelection';

interface Props {
  loading: boolean;
  lists?: EdhRecCategory[];
  deck?: UnifiedDeck;
}

export const CardLists = ({ loading, lists, deck }: Props) => {
  const [categoryKey, setCategoryKey] = useState<string | null>(null);
  const scrollRef = useRef(null);

  const currentCategory = lists?.find(({ key }) => key === categoryKey);

  useEffect(() => {
    if (currentCategory || !lists?.length) return;
    const initialCategoryKey = lists[0].key;
    setCategoryKey(initialCategoryKey);
    // eslint-disable-next-line
  }, [lists, setCategoryKey, currentCategory]);

  const onSetCategory = (newKey: string) => {
    if (scrollRef.current) {
      scrollIntoView(scrollRef.current);
    }
    setCategoryKey(newKey);
  };

  // Remove the backside cardname, if any, because edhrec does not provide them
  const cardNames = deck?.cards.map((card) => card.name.replace(/\s\/\/.*$/, ''));

  const alreadyInDeck = ({ name }: { name: string }) => {
    return cardNames?.includes(name);
  };

  const categorySelection = (
    <CategorySelection
      categoryKey={categoryKey}
      lists={lists}
      loading={loading}
      setCategoryKey={onSetCategory}
    />
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {categorySelection}
      <Divider />
      <div ref={scrollRef} />
      {currentCategory ? (
        <CardGrid
          title={`${currentCategory.title} (${currentCategory.cards.length})`}
          hidePagination
          loading={loading}
          markAsDisabled={alreadyInDeck}
          // @ts-ignore TODO: adequately type this
          cards={currentCategory.cards}
          dragProps={{
            canDrag: true,
            listId: 'EDHREC',
          }}
        />
      ) : (
        <CardGrid loading />
      )}
      <Divider />
      {categorySelection}
    </Space>
  );
};