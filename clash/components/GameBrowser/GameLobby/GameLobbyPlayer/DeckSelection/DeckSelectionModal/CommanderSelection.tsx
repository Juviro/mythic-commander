import React from 'react';
import { Select, Tooltip } from 'antd';

import { LobbyDeck, PreconDeck } from 'backend/lobby/GameLobby.types';

import styles from './DecksList.module.css';
import useCommanderSelection from './useCommanderSelection';

interface CommanderSelectionProps {
  deck: LobbyDeck | PreconDeck;
  displayCommanderSelection?: boolean;
}

const CommanderSelection = ({
  deck,
  displayCommanderSelection,
}: CommanderSelectionProps) => {
  const { options, onSelect, defaultValue } = useCommanderSelection(deck);

  if (options.length <= 1 || !displayCommanderSelection) {
    return (
      <Tooltip title={deck.commanderName}>
        <div className={styles.commander_names}>
          {deck.commanderName?.split('& ').map((commander) => (
            <div key={commander} className={styles.commander_name}>
              {commander}
            </div>
          ))}
        </div>
      </Tooltip>
    );
  }

  return (
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
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default CommanderSelection;
