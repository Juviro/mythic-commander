import React from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { DeckStatus as DeckStatusType } from 'types/graphql';

import message from 'utils/message';
import { changeDeckStatus } from './queries';
import DeckStatusTag, { capitalizeFirstLetter, StyledStatusTag } from './DeckStatusTag';

const StyledWrapper = styled.div`
  position: absolute;
  padding: 4px;
  bottom: 0;
  left: 6px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  cursor: default;

  &:hover ${StyledStatusTag} {
    transform: translateY(0);
  }
`;

interface Props {
  status?: DeckStatusType | null;
  deckId: string;
  deckName: string;
  canEdit?: boolean;
}

const DeckStatus = ({ status, deckId, deckName, canEdit }: Props) => {
  const [mutate] = useMutation(changeDeckStatus);
  if (!status) return null;

  const onSelectStatus = async (e: React.MouseEvent, newStatus: string) => {
    e.stopPropagation();

    message(
      `Updated status of <b>${deckName}</b> to <b>${capitalizeFirstLetter(newStatus)}</b>`
    );

    await mutate({
      variables: { status: newStatus, deckId },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        changeDeckStatus: {
          id: deckId,
          status: newStatus,
        },
      }),
    });
  };

  const otherStatus = Object.values(DeckStatusType).filter((key) => key !== status);

  return (
    <StyledWrapper onClick={(e) => e.stopPropagation()}>
      <DeckStatusTag index={0} status={status} />
      {canEdit &&
        otherStatus.map((val, index) => (
          <DeckStatusTag
            key={val}
            status={val}
            index={index + 1}
            onSelectStatus={(e) => onSelectStatus(e, val)}
          />
        ))}
    </StyledWrapper>
  );
};

export default DeckStatus;
