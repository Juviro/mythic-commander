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

const Label = ({ title }) => (
  <Typography.Text
    strong
    style={{ marginTop: 16, marginBottom: 4 }}
  >{`${title}:`}</Typography.Text>
);

const Filter = ({ advacedSearch, onSearch, hideNameFilter }) => {
  return (
    <FilterWrapper>
      {!hideNameFilter && (
        <>
          <Label title="Card name" />
          <NameFilter onSearch={onSearch} />
        </>
      )}
      {advacedSearch && (
        <>
          <Label title="Set" />
          <SetSelection />
          <Label title="Oracle text" />
          <OracleTextFilter onSearch={onSearch} />
        </>
      )}
      <Label title="Card type" />
      <CardTypeSelection />
      <Label title="Creature type" />
      <CreatureTypeSelection />
      <Label title="Color identity" />
      <ColorSelection />
      {advacedSearch && (
        <>
          <Label title="Rarity" />
          <RarityFilter />
          <Label title="Converted mana cost" />
          <RangeFilter paramName="cmc" onSearch={onSearch} />
          <Label title="Power" />
          <RangeFilter paramName="power" onSearch={onSearch} />
          <Label title="Toughness" />
          <RangeFilter paramName="toughness" onSearch={onSearch} />
          <Label title="Other" />
          <IsCommanderLegal />
          <IsOwned />
        </>
      )}
    </FilterWrapper>
  );
};

export default withRouter(Filter);
