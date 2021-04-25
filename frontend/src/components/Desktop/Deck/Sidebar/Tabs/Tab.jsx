import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { addCardsToWantsList } from 'components/Desktop/Deck/Sidebar/DeckWants/queries';
import { wantsListDesktop } from 'components/Desktop/WantsList/queries';
import message from 'utils/message';
import { Dropzone } from 'components/Elements/Desktop';
import {
  primary,
  primaryHover,
  primaryActive,
  secondary,
  secondaryHover,
  secondaryActive,
} from '../../../../../constants/colors';

const StyledTab = styled.div`
  cursor: pointer;
  position: relative;
  box-shadow: 2px 0px 4px 0px #9c9c9c;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 500;

  color: ${({ active, isSecondary }) => {
    if (active) return 'white';

    if (isSecondary) return secondary;

    return primary;
  }};
  background-color: ${({ active, isSecondary }) => {
    if (!active) return 'white';

    if (isSecondary) return secondary;

    return primary;
  }};

  &:hover {
    background-color: ${({ isSecondary }) =>
      isSecondary ? secondaryHover : primaryHover};
    color: white;
  }
  &:active {
    background-color: ${({ isSecondary }) =>
      isSecondary ? secondaryActive : primaryActive};
    color: white;
  }
  &:last-child {
    border-bottom-right-radius: 10px;
  }
`;

const StyledInner = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 0 24px;

  height: 100%;
  min-height: 40px;
`;

export default ({ active, title, index, onClick, isSecondary, wantsList }) => {
  const [mutateAdd] = useMutation(addCardsToWantsList);

  const onAddCard = (card) => {
    mutateAdd({
      variables: {
        cards: [{ id: card.id, amount: card.amount || 1 }],
        wantsListId: wantsList.id,
      },
      refetchQueries: [
        {
          query: wantsListDesktop,
          variables: { id: wantsList.id },
        },
      ],
    });
    message(`Added <b>${card.name}</b> cards to <b>${wantsList.name}</b>!`);
  };
  return (
    <StyledTab active={active} index={index} onClick={onClick} isSecondary={isSecondary}>
      <Dropzone
        onDrop={onAddCard}
        listId={wantsList?.id}
        disabled={!wantsList?.id}
        style={{ display: 'flex', transition: 'height 0.3s', height: '40px' }}
        canDropStyle={{ height: '100px' }}
      >
        {({ canDrop }) => <StyledInner canDrop={canDrop}>{title}</StyledInner>}
      </Dropzone>
    </StyledTab>
  );
};
