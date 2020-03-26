import React, { useContext } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

import { useQuery } from 'react-apollo';
import CardContext from '../../CardProvider/CardProvider';
import { allCardSets as allCardSetsQuery } from './queries';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

export default ({ card, onSelect, width = '100%', size = 'small' }) => {
  const { sets } = useContext(CardContext);
  const { data, loading } = useQuery(allCardSetsQuery, {
    variables: { oracle_id: card.oracle_id },
  });

  const allCardSets = loading
    ? []
    : data.cardsByOracleId.allSets.map(({ set: setKey, id, set_name }) => ({
        id,
        setKey,
        ...sets[setKey],
        name: set_name || sets[setKey].name,
      }));

  return (
    <Select
      loading={loading}
      size={size}
      defaultValue={card.set_name}
      style={{ width }}
      onSelect={onSelect}
      dropdownStyle={{ minWidth: 200 }}
      onClick={e => e.stopPropagation()}
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
