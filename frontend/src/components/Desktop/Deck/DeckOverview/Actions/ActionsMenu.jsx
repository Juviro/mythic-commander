import React, { useContext } from 'react';
import styled from 'styled-components';
import { Menu, Icon } from 'antd';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';

import CardContext from '../../../../CardProvider/CardProvider';
import { deleteFromDeck, editDeckCard } from '../../../../../queries';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

export default ({ card, ...rest }) => {
  const { owned } = card;
  const { id: deckId } = useParams();
  const { sets } = useContext(CardContext);
  const isCommander = card.zone === 'COMMANDER';

  const [onDeleteMutation] = useMutation(deleteFromDeck);
  const [editMutation] = useMutation(editDeckCard);

  const onDelete = () => {
    onDeleteMutation({ variables: { cardId: card.id, deckId } });
  };
  const onToggleOwned = () => {
    editMutation({
      variables: {
        deckId,
        cardOracleId: card.oracle_id,
        newProps: { owned: !owned },
      },
    });
  };
  const onChangeSet = set => {
    editMutation({
      variables: { cardOracleId: card.oracle_id, deckId, newProps: { set } },
    });
  };
  const onChangeZone = () => {
    editMutation({
      variables: {
        cardOracleId: card.oracle_id,
        deckId,
        newProps: { zone: isCommander ? 'MAINBOARD' : 'COMMANDER' },
      },
    });
  };

  const cardSets = card.all_sets
    .map(({ set }) => set)
    .filter(setKey => setKey !== card.set)
    .map(setKey => ({ setKey, ...sets[setKey] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
  const cardSet = sets[card.set];
  const menuTitle = (
    <span>
      <StyledSetIcon src={cardSet.icon_svg_uri} alt={cardSet.name} />
      Change Set
    </span>
  );

  const displayCommanderChange = ['Legendary', 'Creature'].every(type =>
    card.primaryTypes.includes(type)
  );
  const canChangeSet = Boolean(cardSets.length);

  return (
    <Menu {...rest}>
      <Menu.Item key="toggleOwned" onClick={onToggleOwned}>
        <Icon type={owned ? 'minus' : 'plus'} />
        <span>{owned ? 'Remove from Collection' : 'Add to Collection'}</span>
      </Menu.Item>
      {displayCommanderChange && (
        <Menu.Item key="changeZone" onClick={onChangeZone}>
          <Icon type="star" />
          <span>{isCommander ? 'Remove as Commander' : 'Make Commander'}</span>
        </Menu.Item>
      )}
      {canChangeSet && (
        <Menu.SubMenu title={menuTitle}>
          {cardSets.map(({ name, setKey, icon_svg_uri }) => (
            <Menu.Item key={setKey} onClick={() => onChangeSet(setKey)}>
              <StyledSetIcon src={icon_svg_uri} alt={name} />
              <span>{name}</span>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      )}
      <Menu.Divider />
      <Menu.Item key="delete" onClick={onDelete}>
        <Icon type="delete" />
        <span>Delete from Deck</span>
      </Menu.Item>
    </Menu>
  );
};
