import React from 'react';
import styled from 'styled-components';

import { Popover, Typography } from 'antd';
import { Set } from '../../../../types/graphql';
import CBSIcon from './CBSIcon';
import CBSCardPopover from './CBSCardPopover';

const StyledWrapper = styled.div<{ unreleased: boolean }>`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  ${({ unreleased }) => unreleased && 'filter: opacity(0.4);'}
`;

interface Props {
  set: Set;
}

const CBSCard = ({ set }: Props) => {
  const percentageOwned =
    Math.floor((100 * set.uniqueCardsOwned) / set.uniqueCardCount) / 100;

  const isUnreleased = new Date(set.released_at) > new Date();

  return (
    <Popover
      content={<CBSCardPopover set={set} />}
      placement="top"
      showArrow={false}
      title={set.name}
      trigger="click"
    >
      <StyledWrapper unreleased={isUnreleased}>
        <CBSIcon set={set} percentageOwned={percentageOwned} />
        <Typography.Text>{set.name}</Typography.Text>
      </StyledWrapper>
    </Popover>
  );
};

export default CBSCard;
