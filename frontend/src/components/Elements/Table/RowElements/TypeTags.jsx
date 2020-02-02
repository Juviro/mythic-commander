import React from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';

const StyledSeparator = styled.span`
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;

  &:before {
    content: '//';
  }
`;

const TYPE_SORTING = [
  'Creature',
  'Enchantment',
  'Artifact',
  'Instant',
  'Sorcery',
  'Planeswalker',
  'Land',
];

const filterTypes = type => TYPE_SORTING.includes(type);

const typeToColor = {
  Creature: 'green',
  Land: 'volcano',
  Artifact: 'cyan',
  Planeswalker: 'purple',
  Enchantment: 'orange',
  Instant: 'geekblue',
  Sorcery: 'red',
  Commander: 'gold',
};

export default ({ primaryTypes, flipTypes }) => {
  return (
    <>
      {primaryTypes.filter(filterTypes).map(type => (
        <Tag color={typeToColor[type]} key={type} style={{ color: '#4a4a4a' }}>
          {type}
        </Tag>
      ))}
      {flipTypes && (
        <>
          <StyledSeparator />
          {flipTypes.filter(filterTypes).map(type => (
            <Tag
              color={typeToColor[type]}
              key={type}
              style={{ color: '#4a4a4a' }}
            >
              {type}
            </Tag>
          ))}
        </>
      )}
    </>
  );
};
