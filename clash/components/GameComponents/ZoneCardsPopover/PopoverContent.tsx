import React, { CSSProperties, useContext, useState } from 'react';

import { Button, Checkbox, Input, Space } from 'antd';
import GameStateContext from 'components/Game/GameStateContext';
import { normalizeName } from 'utils/normalizeName';
import useGameActions from 'components/Game/useGameActions';
import PopoverCardList from './PopoverCardList';
import usePopoverCards from './usePopoverCards';

import styles from './ZoneCardsPopover.module.css';

interface Props {
  color?: string;
}

const PopoverContent = ({ color }: Props) => {
  const { peekingCards, setPeekingCards } = useContext(GameStateContext);
  const style = { '--player-color': color };

  const { onEndPeek } = useGameActions();

  const [randomizeBottomCards, setRandomizeBottomCards] = useState(true);
  const [shuffleLibrary, setShuffleLibrary] = useState(true);
  const [search, setSearch] = useState('');
  const {
    cardsToTop,
    cardsToBottom,
    onDropBottom,
    onDropTop,
    cardsInLibrary,
    onDropLibrary,
  } = usePopoverCards();

  const { isSearch } = peekingCards!;

  const onSubmit = () => {
    setPeekingCards(null);

    const shouldShuffleLibrary = isSearch ? shuffleLibrary : false;

    if (!cardsToTop.length && !cardsToBottom.length && !shouldShuffleLibrary) return;

    onEndPeek({
      playerId: peekingCards!.playerId,
      cardsToTop: cardsToTop.map(({ clashId }) => clashId),
      cardsToBottom: cardsToBottom.map(({ clashId }) => clashId),
      shuffleLibrary: shouldShuffleLibrary,
      randomizeBottomCards,
    });
  };

  const filteredCards = cardsInLibrary.filter((card) => {
    if (!search) return true;
    const normalizedCardName = normalizeName(card.name).toLowerCase();
    const normalizedSearch = normalizeName(search).toLowerCase();
    return normalizedCardName.includes(normalizedSearch);
  });

  return (
    <div className={styles.content} style={style as CSSProperties}>
      <PopoverCardList
        cards={cardsToBottom}
        onDrop={onDropBottom}
        title="Bottom of Library"
        empty="Drag Cards here to put them on the Bottom of the Library"
        bottom={
          <Checkbox
            checked={randomizeBottomCards}
            onChange={(e) => setRandomizeBottomCards(e.target.checked)}
          >
            Random order
          </Checkbox>
        }
      />
      {isSearch && (
        <PopoverCardList
          onDrop={onDropLibrary}
          cards={filteredCards}
          empty="No cards in library"
          title={
            <Space size={16}>
              <span>Library</span>
              <Input
                placeholder="Search"
                autoFocus
                value={search}
                allowClear
                onChange={(e) => setSearch(e.target.value)}
              />
            </Space>
          }
        />
      )}
      <PopoverCardList
        cards={cardsToTop}
        onDrop={onDropTop}
        title="Top of Library"
        empty="Drag Cards here to put them on Top of the Library"
        titleRight={
          <span>
            <span>Bottom</span>
            <span> → </span>
            <span>Top</span>
          </span>
        }
        bottom={
          <Space size={16}>
            {isSearch && (
              <Checkbox
                checked={shuffleLibrary}
                onChange={(e) => setShuffleLibrary(e.target.checked)}
              >
                Shuffle Library
              </Checkbox>
            )}
            <Button type="primary" onClick={onSubmit}>
              Done
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default PopoverContent;
