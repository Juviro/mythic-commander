import React, { useContext } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import CardContext from '../../CardProvider/CardProvider';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

export default ({ card, onClick, defaultCardId }) => {
  const { sets } = useContext(CardContext);

  const allCardSets = card.allSets.map(({ set: setKey, id, set_name }) => ({
    id,
    setKey,
    ...sets[setKey],
    name: set_name || sets[setKey].name,
  }));

  const defaultValue =
    defaultCardId || (allCardSets.length && allCardSets[0].id);

  return (
    <Select
      size="small"
      defaultValue={defaultValue}
      style={{ width: '100%' }}
      onSelect={onClick}
      disabled={allCardSets.length <= 1}
    >
      {allCardSets.map(({ name, icon_svg_uri, id }) => (
        <Select.Option value={id} key={id}>
          <StyledSetIcon src={icon_svg_uri} alt={name} />
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};
