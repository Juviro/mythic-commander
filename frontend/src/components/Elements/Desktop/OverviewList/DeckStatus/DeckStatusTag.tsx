import React from 'react';

import { blue300, green300, purple300, yellow300 } from 'constants/colors';
import { DeckStatus as DeckStatusType } from 'types/graphql';
import styled, { css } from 'styled-components';
import { Tag } from 'antd';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const StyledStatusTag = styled(Tag)<{ index: number; open?: boolean }>`
  color: black;
  cursor: ${({ index }) => (index ? 'pointer' : 'default')};
  border-radius: 12px;
  margin: 0 0 4px 0;
  text-align: center;

  z-index: ${({ index }) => 5 - index};
  transition: all 0.2s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(${({ index }) => index * 26}px);

  ${({ index }) => {
    if (typeof index !== 'number') return css``;

    if (index) {
      return css`
        opacity: 0.9;

        &:hover {
          opacity: 1;
          box-shadow: 0 0 5px 1px #5c5c5c;
        }
      `;
    }

    return css`
      box-shadow: 0 0 5px 1px #5c5c5c;
    `;
  }}
`;

const getTagColor = (val: string) => {
  switch (val.toLowerCase()) {
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

interface Props {
  status?: DeckStatusType | null;
  index?: number;
  onSelectStatus?: (e: React.MouseEvent) => void;
}

const DeckStatusTag = ({ status, index, onSelectStatus }: Props) => {
  return (
    <StyledStatusTag color={getTagColor(status)} index={index} onClick={onSelectStatus}>
      {capitalizeFirstLetter(status)}
    </StyledStatusTag>
  );
};

export default DeckStatusTag;
