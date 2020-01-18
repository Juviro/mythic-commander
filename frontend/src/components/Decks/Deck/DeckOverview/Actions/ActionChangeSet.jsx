import React, { useContext } from 'react';
import { Menu } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { editDeckCard } from '../../../../../queries';

import CardContext from '../../../../CardProvider/CardProvider';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

export default ({ card, setIsVisible, ...rest }) => {
  const [changeSetMutation] = useMutation(editDeckCard);
  const { sets } = useContext(CardContext);
  const cardSets = card.all_sets
    .filter(setKey => setKey !== card.set)
    .map(setKey => ({ setKey, ...sets[setKey] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  if (!cardSets.length) return null;

  const { id: deckId } = useParams();
  const onChangeSet = set => {
    setIsVisible(false);
    changeSetMutation({ variables: { cardOracleId: card.oracle_id, deckId, newProps: { set } } });
  };

  const cardSet = sets[card.set];

  const menuTitle = (
    <span>
      <StyledSetIcon src={cardSet.icon_svg_uri} alt={cardSet.name} />
      Change Set
    </span>
  );

  return (
    <Menu.SubMenu title={menuTitle} {...rest}>
      {cardSets.map(({ name, setKey, icon_svg_uri }) => (
        <Menu.Item key={setKey} onClick={() => onChangeSet(setKey)}>
          <StyledSetIcon src={icon_svg_uri} alt={name} />
          <span>{name}</span>
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  );
};
