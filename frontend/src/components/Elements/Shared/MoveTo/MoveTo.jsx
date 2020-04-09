import React from 'react';
import { List, Divider, Typography } from 'antd';
import { useMutation } from 'react-apollo';
import { moveCard } from './queries';

import message from '../../../../utils/message';

const Sublist = ({ title, elements = [], onClick }) => {
  if (!elements.length) return null;
  return (
    <>
      <Divider>{title}</Divider>
      <List>
        {elements.map(({ name, id }) => (
          <List.Item
            key={id}
            onClick={e => {
              e.stopPropagation();
              onClick({ name, id });
            }}
          >
            {name}
          </List.Item>
        ))}
      </List>
    </>
  );
};

export default ({
  moveToList,
  onClose,
  card: { id: cardId, name: cardName },
}) => {
  const { list, originType, originId } = moveToList;
  const [mutate] = useMutation(moveCard);

  const onMove = targetType => ({ id: targetId, name: targetName }) => {
    mutate({
      variables: {
        cardId,
        from: {
          id: originId,
          type: originType,
        },
        to: {
          id: targetId,
          type: targetType,
        },
      },
    });
    const targetListName =
      targetType === 'DECK' ? 'the deck' : `<b>${targetName}</b>`;
    message(`Moved <b>${cardName}</b> to ${targetListName}!`);
    onClose();
  };

  return (
    <>
      <Typography.Title level={4}>Move card to other list</Typography.Title>
      <Sublist title="Decks" elements={list.decks} onClick={onMove('DECK')} />
      <Sublist
        title="Wants"
        elements={list.wantsLists}
        onClick={onMove('WANTS_LIST')}
      />
    </>
  );
};
