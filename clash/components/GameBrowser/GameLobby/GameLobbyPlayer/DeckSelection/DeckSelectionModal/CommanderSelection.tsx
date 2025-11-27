import React from 'react';
import { Select, Tooltip } from 'antd';

import { LobbyDeck, PreconDeck } from 'backend/lobby/GameLobby.types';

import styles from './DecksList.module.css';
import useCommanderSelection from './useCommanderSelection';

interface CommanderSelectionProps {
  deck: LobbyDeck | PreconDeck;
  displayCommanderSelection?: boolean;
  displayInOneLine?: boolean;
}

const CommanderSelection = ({
  deck,
  displayCommanderSelection,
  displayInOneLine = false,
}: CommanderSelectionProps) => {
  const { options, onSelect, defaultValue } = useCommanderSelection(deck);

  if (options.length <= 1 || !displayCommanderSelection) {
    const CommanderWrapperElement = displayInOneLine ? 'span' : 'div';

    return (
      <Tooltip title={deck.commanderName}>
        <div className={styles.commander_names}>
          {deck.commanderName?.split('& ').map((commander) => (
            <CommanderWrapperElement key={commander} className={styles.commander_name}>
              {commander}
            </CommanderWrapperElement>
          ))}
        </div>
      </Tooltip>
    );
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.commander_selection}>
      <Select
        options={[
          {
            label: 'Pick your Commander',
            options,
          },
        ]}
        popupMatchSelectWidth={false}
        defaultValue={defaultValue}
        onChange={onSelect}
      />
    </div>
  );
};

export default CommanderSelection;
