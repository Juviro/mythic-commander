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

  const allCardSets = card.all_sets.map(({ set: setKey, id }) => ({
    id,
    setKey,
    ...sets[setKey],
  }));

  const setsWithVersion = allCardSets.map(set => {
    const cardsWithSameSet = allCardSets.filter(
      ({ setKey }) => setKey === set.setKey
    );
    if (cardsWithSameSet.length === 1) return set;
    const version = cardsWithSameSet.findIndex(({ id }) => id === set.id) + 1;
    return {
      ...set,
      name: `${set.name} (Version ${version})`,
    };
  });

  return (
    <Select
      size="small"
      defaultValue={defaultCardId}
      style={{ width: '100%' }}
      onSelect={onClick}
      disabled={allCardSets.length <= 1}
    >
      {setsWithVersion.map(({ name, icon_svg_uri, id }) => (
        <Select.Option value={id} key={id}>
          <StyledSetIcon src={icon_svg_uri} alt={name} />
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};
