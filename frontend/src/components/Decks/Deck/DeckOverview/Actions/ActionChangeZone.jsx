import React from 'react';
import { Menu, Icon } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { editDeckCard } from '../../../../../queries';

export default ({ card, setIsVisible, ...rest }) => {
  const isDisplayed = ['Legendary', 'Creature'].every(type => card.primaryTypes.includes(type));
  if (!isDisplayed) return null;

  const isCommander = card.zone === 'COMMANDER';
  const { id: deckId } = useParams();

  const [changeZoneMutation] = useMutation(editDeckCard);
  const onChangeZone = () => {
    setIsVisible(false);
    changeZoneMutation({
      variables: { cardOracleId: card.oracle_id, deckId, newProps: { zone: isCommander ? 'MAINBOARD' : 'COMMANDER' } },
    });
  };

  return (
    <Menu.Item {...rest} key="changeZone" onClick={onChangeZone}>
      <Icon type="star" />
      <span>{isCommander ? 'Remove as Commander' : 'Make Commander'}</span>
    </Menu.Item>
  );
};
