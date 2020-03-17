import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { Typography } from 'antd';
import ColorSelection from './ColorSelection';
import SearchFilter from './SearchFilter';
import CreatureTypeSelection from './SelectFilter/CreatureTypeSelection';
import CardTypeSelection from './SelectFilter/CardTypeSelection';
import SetSelection from './SelectFilter/SetSelection';

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

const Filter = ({ advacedSearch }) => {
  return (
    <FilterWrapper>
      <Label title="Card name" />
      <SearchFilter />
      {advacedSearch && (
        <>
          <Label title="Set" />
          <SetSelection />
        </>
      )}
      <Label title="Card type" />
      <CardTypeSelection />
      <Label title="Creature type" />
      <CreatureTypeSelection />
      <Label title="Color identity" />
      <ColorSelection />
    </FilterWrapper>
  );
};

export default withRouter(Filter);
