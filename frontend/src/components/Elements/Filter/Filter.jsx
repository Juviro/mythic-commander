import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

import { Typography } from 'antd';
import ColorSelection from './ColorSelection';
import SearchFilter from './SearchFilter';
import CreatureTypeSelection from './CreatureTypeSelection';
import CardTypeSelection from './CardTypeSelection';

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

const Filter = () => {
  return (
    <FilterWrapper>
      <Label title="Card name" />
      <SearchFilter />
      <Label title="Color identity" />
      <ColorSelection />
      <Label title="Card type" />
      <CardTypeSelection />
      <Label title="Creature type" />
      <CreatureTypeSelection />
    </FilterWrapper>
  );
};

export default withRouter(Filter);
