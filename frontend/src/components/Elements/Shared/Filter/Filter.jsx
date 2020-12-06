import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { Divider, Typography } from 'antd';
import BooleanSelection from 'components/Elements/Shared/Filter/SelectFilter/BooleanSelection';
import ColorSelection from './ColorSelection';
import NameFilter from './TextFilter/NameFilter';
import OracleTextFilter from './TextFilter/OracleTextFilter';
import CreatureTypeSelection from './SelectFilter/CreatureTypeSelection';
import CardTypeSelection from './SelectFilter/CardTypeSelection';
import SetSelection from './SelectFilter/SetSelection';
import RangeFilter from './RangeFilter';
import RarityFilter from './RarityFilter';
import Flex from '../Flex';

const StyledCenterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SytledFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 700px;
`;

const StyledLabel = styled(Typography.Text)`
  min-width: 120px;
  width: 40%;
`;

const getFontSize = (size) => {
  const sizes = {
    small: 14,
    default: 16,
    large: 18,
  };

  return sizes[size] ?? 14;
};

const FilterElement = ({ title, children, dividerAbove, size }) => (
  <>
    {dividerAbove && <Divider />}
    <Flex
      direction="row"
      align="end"
      style={{ marginBottom: 24, fontSize: getFontSize(size) }}
    >
      <StyledLabel strong>{title}</StyledLabel>
      <Flex direction="column" style={{ flex: 1 }}>
        {children}
      </Flex>
    </Flex>
  </>
);

const Filter = ({ onSearch, autoFocus, options, onChangeOption, size = 'small' }) => {
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
          size={size}
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
          size={size}
          onSearch={onSearch}
          onChange={onChangeOption('text')}
        />
      ),
    },
    {
      title: 'Set',
      component: (
        <SetSelection
          size={size}
          onChange={onChangeOption('set')}
          value={set}
          onSearch={onSearch}
        />
      ),
    },
    {
      title: 'Supertype',
      dividerAbove: true,
      component: (
        <CardTypeSelection
          size={size}
          onChangeOption={onChangeOption}
          value={cardType}
          onSearch={onSearch}
        />
      ),
    },
    {
      title: 'Subtype',
      component: (
        <CreatureTypeSelection
          size={size}
          onChange={onChangeOption('creatureType')}
          onSearch={onSearch}
          value={creatureType}
        />
      ),
    },
    {
      title: 'Is Legendary',
      dividerAbove: true,
      component: (
        <BooleanSelection
          onChangeOption={onChangeOption}
          value={isLegendary}
          onChange={onChangeOption('isLegendary')}
          trueLabel="Legendary Only"
          falseLabel="Non-Legandary Only"
        />
      ),
    },
    {
      title: 'Rarity',
      component: (
        <RarityFilter size={size} onChange={onChangeOption('rarity')} value={rarity} />
      ),
    },
    {
      title: 'Color Identity',
      dividerAbove: true,
      component: (
        <ColorSelection size={size} onChange={onChangeOption('colors')} value={colors} />
      ),
    },
    {
      title: 'Converted Mana Cost',
      dividerAbove: true,
      component: (
        <RangeFilter
          size={size}
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
          size={size}
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
          size={size}
          value={toughness}
          onSearch={onSearch}
          onChange={onChangeOption('toughness')}
        />
      ),
    },
    {
      title: 'Legality',
      dividerAbove: true,
      component: (
        <BooleanSelection
          onChange={onChangeOption('isCommanderLegal')}
          value={isCommanderLegal}
          trueLabel="Commander Legal"
          falseLabel="Not Commander Legal"
        />
      ),
    },
    {
      title: 'Owned',
      component: (
        <BooleanSelection
          onChange={onChangeOption('isOwned')}
          value={isOwned}
          trueLabel="Owned Cards Only"
          falseLabel="Unowned Cards Only"
        />
      ),
    },
  ];

  return (
    <StyledCenterWrapper>
      <SytledFilterWrapper>
        {filterElements.map(({ title, component, dividerAbove }) => (
          <FilterElement
            key={title}
            title={title}
            dividerAbove={dividerAbove}
            size={size}
          >
            {component}
          </FilterElement>
        ))}
      </SytledFilterWrapper>
    </StyledCenterWrapper>
  );
};

export default withRouter(Filter);
