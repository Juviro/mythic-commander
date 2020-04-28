import React from 'react';

import { Checkbox } from 'antd';
import styled from 'styled-components';

const RARITIES = ['Mythic', 'Uncommon', 'Rare', 'Common'];

const StyledWrapper = styled.div`
  display: block;
`;

export default ({ onChange: onSubmit, value = '' }) => {
  const onChange = rarity => e => {
    const isSelected = e.target.checked;
    const rarityLetter = rarity[0].toLowerCase();

    const withoutRarity = value.replace(new RegExp(rarityLetter, 'g'), '');
    const newRarity = isSelected ? withoutRarity + rarityLetter : withoutRarity;

    onSubmit(newRarity);
  };

  return (
    <StyledWrapper>
      {RARITIES.map(rarity => (
        <Checkbox
          onChange={onChange(rarity)}
          checked={value.includes(rarity[0].toLowerCase())}
          key={rarity}
          style={{ margin: '0 8px 0 0', width: '45%' }}
        >
          {rarity}
        </Checkbox>
      ))}
    </StyledWrapper>
  );
};
