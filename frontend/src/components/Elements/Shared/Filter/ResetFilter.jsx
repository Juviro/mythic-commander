import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import { blendIn } from '../../../Animations';

const StyledButton = styled(Button)`
  animation: ${blendIn} 0.3s linear;
`;

const filterAttrs = [
  'name',
  'colors',
  'set',
  'text',
  'isLegal',
  'creatureType',
  'isLegendary',
  'isCommanderLegal',
  'cardType',
  'cmc',
  'toughness',
  'power',
  'isOwned',
  'rarity',
];

export default ({ title = 'reset filter' }) => {
  const [filter, setFilter] = useQueryParams(
    filterAttrs.reduce((acc, val) => ({ ...acc, [val]: StringParam }), {})
  );

  const onResetSearch = e => {
    e.stopPropagation();
    setFilter(filterAttrs.reduce((acc, val) => ({ ...acc, [val]: null }), {}));
  };

  const canResetSearch = filterAttrs.some(attr => filter[attr]);

  if (!canResetSearch) return null;

  return (
    <StyledButton
      danger
      type="link"
      onClick={onResetSearch}
      style={{ height: 14, lineHeight: 0 }}
    >
      {title}
    </StyledButton>
  );
};
