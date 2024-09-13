import React from 'react';
import { Badge, Button, Checkbox, Dropdown, MenuProps } from 'antd';

import CreatureIcon from 'public/assets/mtgicons/creature.svg';
import InstantIcon from 'public/assets/mtgicons/instant.svg';
import SorceryIcon from 'public/assets/mtgicons/sorcery.svg';
import EnchantmentIcon from 'public/assets/mtgicons/enchantment.svg';
import ArtifactIcon from 'public/assets/mtgicons/artifact.svg';
import PlaneswalkerIcon from 'public/assets/mtgicons/planeswalker.svg';
import LandIcon from 'public/assets/mtgicons/land.svg';
import BattleIcon from 'public/assets/icons/phase_combat.svg';

import { FilterOutlined } from '@ant-design/icons';
import { VisibleCard } from 'backend/database/gamestate.types';
import styles from './LibraryExplorer.module.css';

const CARD_TYPE_OPTIONS = [
  {
    key: 'land',
    label: 'Land',
    Icon: LandIcon,
  },
  {
    key: 'creature',
    label: 'Creature',
    Icon: CreatureIcon,
    children: <div>test</div>,
  },
  {
    key: 'enchantment',
    label: 'Enchantment',
    Icon: EnchantmentIcon,
  },
  {
    key: 'artifact',
    label: 'Artifact',
    Icon: ArtifactIcon,
  },
  {
    key: 'instant',
    label: 'Instant',
    Icon: InstantIcon,
  },
  {
    key: 'sorcery',
    label: 'Sorcery',
    Icon: SorceryIcon,
  },
  {
    key: 'planeswalker',
    label: 'Planeswalker',
    Icon: PlaneswalkerIcon,
  },
  {
    key: 'battle',
    label: 'Battle',
    Icon: BattleIcon,
  },
] as const;

interface Props {
  filteredItemKeys: string[];
  setFilteredItemKeys: (keys: string[]) => void;
  cards: VisibleCard[];
}

const LibraryExplorerFilter = ({
  filteredItemKeys,
  setFilteredItemKeys,
  cards,
}: Props) => {
  const handleFilter = (key: string) => {
    const newKeys = filteredItemKeys.includes(key)
      ? filteredItemKeys.filter((k) => k !== key)
      : [...filteredItemKeys, key];
    setFilteredItemKeys(newKeys);
  };

  const getNumberOfCards = (key: string) => {
    return cards.filter((card) => card.type_line.toLowerCase().includes(key)).length;
  };

  const items: MenuProps['items'] = CARD_TYPE_OPTIONS.map(({ Icon, key, label }) => ({
    key,
    label: (
      <div onClick={(e) => e.stopPropagation()}>
        <Checkbox
          className={styles.filter_checkbox}
          checked={filteredItemKeys.includes(key)}
          onChange={() => handleFilter(key)}
          disabled={!getNumberOfCards(key)}
        >
          <span className={styles.filter_label}>
            <Icon className={styles.filter_icon} />
            {`${label} (${getNumberOfCards(key)})`}
          </span>
        </Checkbox>
      </div>
    ),
  }));

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      overlayClassName={styles.filter_dropdown}
    >
      <Badge count={filteredItemKeys.length}>
        <Button className={styles.filter_button} icon={<FilterOutlined />}>
          Filter
        </Button>
      </Badge>
    </Dropdown>
  );
};

export default LibraryExplorerFilter;
