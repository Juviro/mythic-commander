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

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Label = ({ title, style }) => (
  <Typography.Text
    strong
    style={{ marginTop: 8, marginBottom: 4, ...style }}
  >{`${title}:`}</Typography.Text>
);

const Filter = ({
  advancedSearch,
  onSearch,
  hideNameFilter,
  autoFocus,
  options,
  onChangeOption,
}) => {
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

  return (
    <FilterWrapper>
      {!hideNameFilter && (
        <>
          <Label title="Card name" style={{ marginTop: 0 }} />
          <NameFilter
            value={name}
            onSearch={onSearch}
            autoFocus={autoFocus}
            onChange={onChangeOption('name')}
          />
        </>
      )}
      {advancedSearch && (
        <>
          <Label title="Set" />
          <SetSelection onChange={onChangeOption('set')} value={set} />
          <Label title="Card text" />
          <OracleTextFilter
            value={text}
            onSearch={onSearch}
            onChange={onChangeOption('text')}
          />
        </>
      )}
      <Label title="Card type" />
      <CardTypeSelection
        onChangeOption={onChangeOption}
        value={cardType}
        isLegendary={isLegendary}
      />
      <Label title="Creature type" />
      <CreatureTypeSelection
        onChange={onChangeOption('creatureType')}
        value={creatureType}
      />
      <Label title="Color identity" />
      <ColorSelection onChange={onChangeOption('colors')} value={colors} />
      {advancedSearch && (
        <>
          <Label title="Rarity" />
          <RarityFilter onChange={onChangeOption('rarity')} value={rarity} />
          <Label title="Converted mana cost" />
          <RangeFilter
            value={cmc}
            onSearch={onSearch}
            onChange={onChangeOption('cmc')}
          />
          <Label title="Power" />
          <RangeFilter
            value={power}
            onSearch={onSearch}
            onChange={onChangeOption('power')}
          />
          <Label title="Toughness" />
          <RangeFilter
            value={toughness}
            onSearch={onSearch}
            onChange={onChangeOption('toughness')}
          />
          <Label title="Other" />
          <IsCommanderLegal
            onChange={onChangeOption('isCommanderLegal')}
            isCommanderLegal={isCommanderLegal}
          />
          <IsOwned onChange={onChangeOption('isOwned')} isOwned={isOwned} />
        </>
      )}
    </FilterWrapper>
  );
};

export default withRouter(Filter);
