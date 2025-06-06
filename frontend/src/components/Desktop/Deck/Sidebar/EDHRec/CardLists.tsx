import React, { useEffect, useRef, useState } from 'react';

import CardGrid from 'components/Elements/Shared/CardGrid/CardGrid';
import { EdhRecCategory } from 'types/graphql';
import { UnifiedCard, UnifiedDeck } from 'types/unifiedTypes';
import { Divider, Space } from 'antd';
import scrollIntoView from 'utils/scrollIntoView';
import { unifySingleCard } from 'utils/unifyCardFormat';
import { CategorySelection } from './CategorySelection';

interface Props {
  loading: boolean;
  lists?: EdhRecCategory[];
  deck?: UnifiedDeck;
}

export const CardLists = ({ loading, lists, deck }: Props) => {
  const [categoryKey, setCategoryKey] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCategory = lists?.find(({ key }) => key === categoryKey);

  useEffect(() => {
    if (currentCategory || !lists?.length) return;
    const initialCategoryKey = lists[0].key;
    setCategoryKey(initialCategoryKey);
    // eslint-disable-next-line
  }, [lists, setCategoryKey, currentCategory]);

  const onSetCategory = (animateScrolling: boolean) => (newKey: string) => {
    if (scrollRef.current) {
      if (animateScrolling) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        scrollIntoView(scrollRef.current);
      }
    }
    setCategoryKey(newKey);
  };

  const cardNames = deck?.cards.map((card) => card.name);

  const alreadyInDeck = ({ name }: { name: string }) => {
    return cardNames?.includes(name);
  };

  const getCategorySelection = (animateScrolling: boolean) => (
    <CategorySelection
      categoryKey={categoryKey}
      lists={lists}
      loading={loading}
      setCategoryKey={onSetCategory(animateScrolling)}
    />
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {getCategorySelection(true)}
      <Divider />
      <div ref={scrollRef} />
      {currentCategory ? (
        <CardGrid
          title={`${currentCategory.title} (${currentCategory.cards.length})`}
          hidePagination
          loading={loading}
          markAsDisabled={alreadyInDeck}
          cards={currentCategory.cards.map(unifySingleCard) as unknown as UnifiedCard[]}
          dragProps={{
            canDrag: true,
            listId: 'EDHREC',
          }}
        />
      ) : (
        <CardGrid loading />
      )}
      <Divider />
      {getCategorySelection(false)}
    </Space>
  );
};
