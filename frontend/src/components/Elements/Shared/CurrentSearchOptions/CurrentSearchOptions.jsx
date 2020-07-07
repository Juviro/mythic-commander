import React, { useContext } from 'react';
import { Typography, Divider } from 'antd';
import { useQueryParams } from 'use-query-params';

import styled from 'styled-components';
import Flex from '../Flex';
import searchParams from '../../../../constants/searchParams';
import CardContext from '../../../Provider/CardProvider';

const StyledParam = styled.div`
  margin-right: 8px;
`;

const formatKey = key => {
  const capitalizeFirstLetter = value => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  switch (key) {
    case 'creatureType':
      return 'Creature Type';
    case 'cardType':
      return 'Card Type';
    case 'isLegendary':
      return 'Legendary';
    case 'isOwned':
      return 'Owned';
    case 'isCommanderLegal':
      return 'Commander legal';
    default:
      return capitalizeFirstLetter(key);
  }
};

const formatRarity = rarity => {
  return rarity
    .split('')
    .map(rarityKey => {
      switch (rarityKey) {
        case 'm':
          return 'Mythic';
        case 'r':
          return 'Rare';
        case 'u':
          return 'Uncommon';
        case 'c':
          return 'Common';
        default:
          return '';
      }
    })
    .join(', ');
};

const formatColors = colors => {
  return colors
    .split('')
    .map(rarityKey => {
      switch (rarityKey) {
        case 'w':
          return 'White';
        case 'u':
          return 'Blue';
        case 'b':
          return 'Black';
        case 'r':
          return 'Red';
        case 'g':
          return 'Green';
        case 'x':
          return 'Exact match';
        case '-':
          return 'Exclude others';
        default:
          return '';
      }
    })
    .join(', ');
};

const formatValue = (key, value, sets) => {
  switch (key) {
    case 'set':
      return sets[value] ? sets[value].name : '';
    case 'rarity':
      return formatRarity(value);
    case 'isLegendary':
      return value === 'true' ? 'Legendary only' : 'Non-legendary only';
    case 'isCommanderLegal':
      return 'Commander legal only';
    case 'isOwned':
      return 'Owned cards only';
    case 'colors':
      return formatColors(value);
    default:
      return value;
  }
};

export default ({ style, showDivider }) => {
  const { sets } = useContext(CardContext);
  const [params] = useQueryParams(searchParams);

  const activeParams = Object.keys(params)
    .map(key => ({ key, value: params[key] }))
    .filter(({ value }) => Boolean(value));

  if (!activeParams.length) return null;

  return (
    <Flex direction="column">
      {showDivider && <Divider />}
      <Typography.Text strong>
        Displaying cards matching the following criteria:
      </Typography.Text>
      <Flex wrap="wrap" style={style}>
        {activeParams.map(({ key, value }) => (
          <StyledParam key={key}>
            <Typography.Text strong style={{ marginRight: 4 }}>{`${formatKey(
              key
            )}:`}</Typography.Text>
            <Typography.Text>{formatValue(key, value, sets)}</Typography.Text>
          </StyledParam>
        ))}
      </Flex>
    </Flex>
  );
};
