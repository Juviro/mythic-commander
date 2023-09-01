import { Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import { Deck, OwnDeck } from 'backend/lobby/GameLobby.types';
import { DownOutlined } from '@ant-design/icons';
import useLocalStorage from '../../../../backend/hooks/useLocalStorage';
import GameBrowserContext from '../../GameBrowserContext';
import DeckLabel from './DeckLabel';

import styles from './DeckSelection.module.css';

const getDecks = async () => {
  const res = await fetch('/api/decks');
  return res.json();
};

interface Props {
  deck?: Deck | null;
  canSelectDeck: boolean;
  playerId: string;
  isReady: boolean;
}

const DeckSelection = ({ canSelectDeck, playerId, deck, isReady }: Props) => {
  const { onSelectDeck } = useContext(GameBrowserContext);
  const [initialDeckId, setInitialDeckId] = useLocalStorage<string>('initial-deck');

  const { data, isLoading } = useQuery<OwnDeck[]>(`decks-${playerId}`, getDecks, {
    enabled: canSelectDeck,
    refetchInterval: Infinity,
    staleTime: Infinity,
  });

  const options = data?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const onSubmitSelection = (deckId: string) => {
    const selectedDeck = data?.find((d) => d.id === deckId);

    if (!selectedDeck) return;

    if (!selectedDeck) return;

    onSelectDeck({
      id: selectedDeck.id,
      imgSrc: selectedDeck.imgSrc,
      name: selectedDeck.publicName,
    });
  };

  const onSelect = (deckId: string) => {
    setInitialDeckId(deckId);
    onSubmitSelection(deckId);
  };

  useEffect(() => {
    if (!data) return;

    onSubmitSelection(initialDeckId);
  }, [Boolean(data)]);

  if (!canSelectDeck && !deck) {
    return <span>No Deck selected</span>;
  }

  if (!canSelectDeck) {
    return <DeckLabel deck={deck as Deck} displayTooltip />;
  }

  const disabled = isLoading || isReady;

  return (
    <Select
      onChange={onSelect}
      className={styles.select}
      loading={isLoading}
      disabled={disabled}
      value={deck?.id}
      size="large"
      bordered={false}
      suffixIcon={
        <DownOutlined
          color="black"
          style={{
            color: disabled ? undefined : 'var(--color-text)',
            transition: 'color 0.3s ease',
            transitionDelay: '0.2s',
            pointerEvents: 'none',
          }}
        />
      }
      placeholder="Select your deck"
    >
      {options?.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          <DeckLabel
            deck={data?.find((d) => d.id === option.value) as Deck}
            deckName={data?.find((d) => d.id === option.value)?.name}
          />
        </Select.Option>
      ))}
    </Select>
  );
};

export default DeckSelection;