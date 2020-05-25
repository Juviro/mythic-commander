import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { Typography } from 'antd';
import ColorSelection from './ColorSelection';
import NameFilter from './TextFilter/NameFilter';
import OracleTextFilter from './TextFilter/OracleTextFilter';
import CreatureTypeSelection from './SelectFilter/CreatureTypeSelection';
import CardTypeSelection from './SelectFilter/CardTypeSelection';
import SetSelection from './SelectFilter/SetSelection';
import IsCommanderLegal from './CheckboxFilter/IsCommanderLegal';
import IsOwned from './CheckboxFilter/IsOwned';
import RangeFilter from './RangeFilter';
import RarityFilter from './RarityFilter';
import Flex from '../Flex';

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled(Typography.Text)`
  width: 130px;
`;

const FilterElement = ({ title, children }) => (
  <Flex direction="row" align="end" style={{ marginBottom: 24 }}>
    <StyledLabel strong> {title}</StyledLabel>
    <Flex direction="column" style={{ flex: 1 }}>
      {children}
    </Flex>
  </Flex>
);

const Filter = ({ onSearch, autoFocus, options, onChangeOption }) => {
  const {
    name,
    rarity,
    cmc,
    power,
    toughness,
    set,
    text,
    colors,
    creatureType,
    cardType,
    isLegendary,
    isOwned,
    isCommanderLegal,
  } = options;

  const filterElements = [
    {
      title: 'Card name',
      component: (
        <NameFilter
          value={name}
          onSearch={onSearch}
          autoFocus={autoFocus}
          onChange={onChangeOption('name')}
        />
      ),
    },
    {
      title: 'Card Text',
      component: (
        <OracleTextFilter
          value={text}
          onSearch={onSearch}
          onChange={onChangeOption('text')}
        />
      ),
    },
    {
      title: 'Set',
      component: (
        <SetSelection
          onChange={onChangeOption('set')}
          value={set}
          onSearch={onSearch}
        />
      ),
    },
    {
      title: 'Card Type',
      component: (
        <CardTypeSelection
          onChangeOption={onChangeOption}
          value={cardType}
          onSearch={onSearch}
          isLegendary={isLegendary}
        />
      ),
    },
    {
      title: 'Creature Type',
      component: (
        <CreatureTypeSelection
          onChange={onChangeOption('creatureType')}
          onSearch={onSearch}
          value={creatureType}
        />
      ),
    },
    {
      title: 'Color Identity',
      component: (
        <ColorSelection onChange={onChangeOption('colors')} value={colors} />
      ),
    },
    {
      title: 'Rarity',
      component: (
        <RarityFilter onChange={onChangeOption('rarity')} value={rarity} />
      ),
    },
    {
      title: 'Cmc',
      component: (
        <RangeFilter
          value={cmc}
          onSearch={onSearch}
          onChange={onChangeOption('cmc')}
        />
      ),
    },
    {
      title: 'Power',
      component: (
        <RangeFilter
          value={power}
          onSearch={onSearch}
          onChange={onChangeOption('power')}
        />
      ),
    },
    {
      title: 'Toughness',
      component: (
        <RangeFilter
          value={toughness}
          onSearch={onSearch}
          onChange={onChangeOption('toughness')}
        />
      ),
    },
    {
      title: 'Legality',
      component: (
        <IsCommanderLegal
          onChange={onChangeOption('isCommanderLegal')}
          isCommanderLegal={isCommanderLegal}
        />
      ),
    },
    {
      title: 'Owned',
      component: (
        <IsOwned onChange={onChangeOption('isOwned')} isOwned={isOwned} />
      ),
    },
  ];

  return (
    <FilterWrapper>
      {filterElements.map(({ title, component }) => (
        <FilterElement key={title} title={title}>
          {component}
        </FilterElement>
      ))}
    </FilterWrapper>
  );
};

export default withRouter(Filter);
