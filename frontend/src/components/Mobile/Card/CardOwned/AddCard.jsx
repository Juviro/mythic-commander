import React, { useContext } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import CardContext from '../../../Provider/CardProvider';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

export default ({ cards, onAddCard }) => {
  const { sets } = useContext(CardContext);
  if (!cards.length) return null;

  return (
    <Select value="Add a set..." onChange={onAddCard} style={{ marginTop: 16 }}>
      {cards.map(({ id, set_name, set: setKey }) => (
        <Select.Option value={id} key={id}>
          <StyledSetIcon src={sets[setKey].icon_svg_uri} alt={set_name} />
          {set_name}
        </Select.Option>
      ))}
    </Select>
  );
};
