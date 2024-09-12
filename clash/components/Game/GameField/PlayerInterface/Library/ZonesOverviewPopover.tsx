import React, { useContext } from 'react';

import { Player } from 'backend/database/gamestate.types';
import { pluralizeCards } from 'utils/i18nUtils';

import LibraryImage from 'public/assets/icons/library.svg';
import GraveyardImage from 'public/assets/icons/graveyard.svg';
import ExileImage from 'public/assets/icons/exile.svg';
import HandImage from 'public/assets/icons/hand.svg';

import ColoredPlayerName from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import GameStateContext from 'components/Game/GameStateContext';
import styles from './Library.module.css';

interface Props {
  player: Player;
}

const ZonesOverviewPopover = ({ player }: Props) => {
  const { globalCssStyle } = useContext(GameStateContext);
  const { exile, graveyard, hand, library } = player.zones;

  const zones = [
    { name: 'Library', cards: library, icon: <LibraryImage /> },
    { name: 'Hand', cards: hand, icon: <HandImage /> },
    { name: 'Graveyard', cards: graveyard, icon: <GraveyardImage /> },
    { name: 'Exile', cards: exile, icon: <ExileImage /> },
  ];

  return (
    <div style={globalCssStyle}>
      <ColoredPlayerName id={player.id} />
      <table>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.name}>
              <td className={styles.popover_zone_icon}>{zone.icon}</td>
              <td className={styles.popover_zone_name}>{`${zone.name}: `}</td>
              <td>{pluralizeCards(zone.cards.length, '1')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ZonesOverviewPopover;
