import React, { CSSProperties, useContext, useState } from 'react';
import classNames from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Space } from 'antd';

import GameStateContext from 'components/Game/GameStateContext';
import { normalizeName } from 'utils/normalizeName';
import useGameActions from 'components/Game/useGameActions';
import { Zone } from 'backend/database/gamestate.types';
import { hasAnyBasicLandType } from 'utils/cardTypes';
import PopoverCardList from './PopoverCardList';
import usePopoverCards from './usePopoverCards';

import styles from './ZoneCardsPopover.module.css';

const OrderLabel = () => (
  <span>
    <span>Bottom</span>
    <span> → </span>
    <span>Top</span>
  </span>
);

interface Props {
  color?: string;
  zone: Zone;
}

const PopoverContent = ({ color, zone }: Props) => {
  const { peekingCards, setPeekingCards } = useContext(GameStateContext);
  const [landsOnly, setLandsOnly] = useState(false);
  const style = { '--player-color': color };

  const { onEndPeek } = useGameActions();

  const [randomizeBottomCards, setRandomizeBottomCards] = useState(true);
  const [shuffleLibrary, setShuffleLibrary] = useState(true);
  const [search, setSearch] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const {
    cardsToTop,
    cardsToBottom,
    onDropBottom,
    onDropTop,
    onMoveRestToBottom,
    cardsInLibrary,
    onDropLibrary,
  } = usePopoverCards();

  const { isSearch } = peekingCards!;

  const onSubmit = () => {
    setLandsOnly(false);
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

  const filteredCards = cardsInLibrary
    .filter((card) => {
      if (!search) return true;
      const normalizedCardName = normalizeName(card.name).toLowerCase();
      const normalizedSearch = normalizeName(search).toLowerCase();
      return normalizedCardName.includes(normalizedSearch);
    })
    .filter((card) => {
      if (!landsOnly) return true;
      return hasAnyBasicLandType(card.type_line);
    });

  return (
    <>
      {isMinimized && <span className={styles.minimized_title}>Search Library</span>}
      <div
        className={classNames(styles.minimize_button, {
          [styles.minimize_button__minimized]: isMinimized,
        })}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <DownOutlined />
      </div>
      <div
        className={classNames(styles.content, {
          [styles.content__minimized]: isMinimized,
        })}
        style={style as CSSProperties}
      >
        <PopoverCardList
          zone={zone}
          cards={cardsToBottom}
          onDrop={onDropBottom}
          title="Bottom of Library"
          empty="Drag Cards here to put them on the Bottom of the Library"
          bottom={
            <div className={styles.popover_content_buttons}>
              <Checkbox
                checked={randomizeBottomCards}
                onChange={(e) => setRandomizeBottomCards(e.target.checked)}
              >
                Random order
              </Checkbox>
              {!isSearch && (
                <Button type="primary" ghost onClick={onMoveRestToBottom}>
                  Move all to Bottom
                </Button>
              )}
            </div>
          }
        />
        {isSearch && (
          <PopoverCardList
            zone={zone}
            onDrop={onDropLibrary}
            cards={filteredCards}
            empty="No cards found"
            titleRight={<OrderLabel />}
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
                <Checkbox
                  checked={landsOnly}
                  onChange={(e) => setLandsOnly(e.target.checked)}
                  style={{ fontWeight: 'normal' }}
                >
                  Only Lands with Basic Land Types
                </Checkbox>
              </Space>
            }
          />
        )}
        <PopoverCardList
          zone={zone}
          cards={cardsToTop}
          onDrop={onDropTop}
          title="Top of Library"
          empty="Drag Cards here to put them on Top of the Library"
          titleRight={<OrderLabel />}
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
    </>
  );
};

export default PopoverContent;
