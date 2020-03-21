import React from 'react';

import { Checkbox } from 'antd';
import { StringParam, useQueryParam } from 'use-query-params';
import styled from 'styled-components';

const RARITIES = ['Mythic', 'Uncommon', 'Rare', 'Common'];

const StyledWrapper = styled.div`
  display: block;
`;

export default () => {
  const [rarities = '', setRarities] = useQueryParam('rarity', StringParam);

  const onChange = rarity => e => {
    const isSelected = e.target.checked;
    const rarityLetter = rarity[0].toLowerCase();

    const withoutRarity = rarities.replace(new RegExp(rarityLetter, 'g'), '');
    if (isSelected) {
      setRarities(withoutRarity + rarityLetter);
    } else {
      setRarities(withoutRarity);
    }
  };

  return (
    <StyledWrapper>
      {RARITIES.map(rarity => (
        <Checkbox
          onChange={onChange(rarity)}
          checked={rarities.includes(rarity[0].toLowerCase())}
          key={rarity}
          style={{ margin: '0 8px 0 0', width: '45%' }}
        >
          {rarity}
        </Checkbox>
      ))}
    </StyledWrapper>
  );
};
