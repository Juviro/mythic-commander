import React from 'react';
import { Tag } from 'antd';
import { useMutation } from 'react-apollo';
import styled, { css } from 'styled-components';
import { DeckStatus as DeckStatusType } from 'types/graphql';

import { blue300, green300, purple300, yellow300 } from 'constants/colors';
import message from 'utils/message';
import { changeDeckStatus } from './queries';

const StyledTag = styled(Tag)<{ index: number; open?: boolean }>`
  color: black;
  cursor: pointer;
  border-radius: 12px;
  margin: 0 0 4px 0;
  text-align: center;

  z-index: ${({ index }) => 5 - index};
  transition: all 0.2s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(${({ index }) => index * 26}px);

  ${({ index }) =>
    index
      ? css`
          opacity: 0.9;

          &:hover {
            opacity: 1;
            box-shadow: 0 0 5px 1px #5c5c5c;
          }
        `
      : css`
          box-shadow: 0 0 5px 1px #5c5c5c;
        `}
`;

const StyledWrapper = styled.div`
  position: absolute;
  padding: 4px;
  bottom: 0;
  left: 6px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  cursor: default;

  &:hover ${StyledTag} {
    transform: translateY(0);
  }
`;

interface Props {
  status?: DeckStatusType | null;
  deckId: string;
  deckName: string;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DeckStatus = ({ status, deckId, deckName }: Props) => {
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
          __typename: 'Deck',
          id: deckId,
          status: newStatus,
        },
      }),
    });
  };

  const otherStatus = Object.values(DeckStatusType).filter((key) => key !== status);

  const getTagColor = (val: string) => {
    switch (val) {
      case DeckStatusType.Active:
        return green300;
      case DeckStatusType.Draft:
        return yellow300;
      case DeckStatusType.Archived:
        return blue300;
      default:
        return purple300;
    }
  };

  return (
    <StyledWrapper onClick={(e) => e.stopPropagation()}>
      <StyledTag index={0} color={getTagColor(status)}>
        {capitalizeFirstLetter(status)}
      </StyledTag>
      {otherStatus.map((val, index) => (
        <StyledTag
          key={val}
          color={getTagColor(val)}
          index={index + 1}
          onClick={(e) => onSelectStatus(e, val)}
        >
          {capitalizeFirstLetter(val)}
        </StyledTag>
      ))}
    </StyledWrapper>
  );
};

export default DeckStatus;
