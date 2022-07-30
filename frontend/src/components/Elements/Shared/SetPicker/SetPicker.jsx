import React, { useContext } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import CardContext from '../../../Provider/CardProvider';
import { allCardSets as allCardSetsQuery } from './queries';
import useSubmitOnEnter from '../../../Hooks/useSubmitOnEnter';
import { useToggle } from '../../../Hooks';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

export default ({
  card,
  onSubmit,
  onSelect,
  onSelectCard,
  width = '100%',
  size = 'small',
  style,
}) => {
  const [isOpen, toggleIsOpen] = useToggle();
  const { sets } = useContext(CardContext);
  const { data, loading } = useQuery(allCardSetsQuery, {
    variables: { oracle_id: card.oracle_id },
    fetchPolicy: 'cache-first',
  });

  const allCardSets = loading
    ? []
    : data.cardByOracleId.oracleCard.allSets.map(
        ({ set: setKey, id, set_name, imgKey }) => ({
          id,
          imgKey,
          setKey,
          ...sets[setKey],
          name: set_name || sets[setKey].name,
        })
      );

  const onSelectOption = (cardId) => {
    if (onSelect) onSelect(cardId);
    if (onSelectCard) {
      const selectedCard = allCardSets.find(({ id }) => cardId === id);
      onSelectCard(selectedCard);
    }
  };

  return (
    <Select
      loading={loading}
      disabled={loading}
      size={size}
      defaultValue={card.set_name}
      style={{ width, ...style }}
      onKeyDown={useSubmitOnEnter(!isOpen && onSubmit)}
      onSelect={onSelectOption}
      dropdownStyle={{ width }}
      onClick={(e) => e.stopPropagation()}
      onDropdownVisibleChange={toggleIsOpen}
    >
      {allCardSets.map(({ name, icon_svg_uri, id }) => (
        <Select.Option value={id} key={id} style={{ width }}>
          <StyledSetIcon src={icon_svg_uri} alt={name} />
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};
