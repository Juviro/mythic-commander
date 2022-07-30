import React from 'react';
import { Typography } from 'antd';
import { useMutation } from 'react-apollo';
import { moveCard } from './queries';

import message from '../../../../utils/message';
import { useToggle } from '../../../Hooks';
import Spinner from '../Spinner';
import Sublist from './Sublist';

export default ({ moveToList, onClose, card: { id: cardId, name: cardName } }) => {
  const { list, originType, originId } = moveToList;
  const [mutate] = useMutation(moveCard);
  const [isMoving, toggleIsMoving] = useToggle();

  const onMove =
    (targetType) =>
    async ({ id: targetId, name: targetName }) => {
      toggleIsMoving();
      const { data } = await mutate({
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
        errorPolicy: 'ignore',
      });
      const targetListName = targetType === 'DECK' ? 'the deck' : `<b>${targetName}</b>`;

      if (data) {
        message(`Moved <b>${cardName}</b> to ${targetListName}!`);
        onClose();
      }
    };

  return (
    <>
      <Typography.Title level={4}>Move card to other list</Typography.Title>
      {isMoving ? (
        <Spinner />
      ) : (
        <>
          <Sublist title="Decks" elements={list.decks} onClick={onMove('DECK')} />
          <Sublist
            title="Wants"
            elements={list.wantsLists}
            onClick={onMove('WANTS_LIST')}
          />
        </>
      )}
    </>
  );
};
