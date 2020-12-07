import React from 'react';
import { Checkbox } from 'antd';

import Flex from '../Flex';

const RARITIES = [
  ['Mythic', 'Rare'],
  ['Uncommon', 'Common'],
];

export default ({ onChange: onSubmit, value = '' }) => {
  const onChange = (rarity) => (e) => {
    const isSelected = e.target.checked;
    const rarityLetter = rarity[0].toLowerCase();

    const withoutRarity = value.replace(new RegExp(rarityLetter, 'g'), '');
    const newRarity = isSelected ? withoutRarity + rarityLetter : withoutRarity;

    onSubmit(newRarity);
  };

  return (
    <Flex direction="row" wrap="wrap" justify="space-between">
      {RARITIES.map((rarityGroup) => (
        <Flex direction="column" key={Math.random()} style={{ width: 180 }}>
          {rarityGroup.map((rarity) => (
            <Checkbox
              onChange={onChange(rarity)}
              checked={value.includes(rarity[0].toLowerCase())}
              key={rarity}
              style={{
                margin: '0 8px 0 0',
                width: '40%',
                minWidth: 'fit-content',
                height: '50%',
              }}
            >
              {rarity}
            </Checkbox>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
