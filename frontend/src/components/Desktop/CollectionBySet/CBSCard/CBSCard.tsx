import React from 'react';
import styled from 'styled-components';

import { Popover, Typography } from 'antd';
import { Set } from '../../../../types/graphql';
import CBSIcon from './CBSIcon';
import CBSCardPopover from './CBSCardPopover';

const StyledWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

interface Props {
  set: Set;
}

const CBSCard = ({ set }: Props) => {
  const percentageOwned =
    Math.floor((100 * set.uniqueCardsOwned) / set.uniqueCardCount) / 100;

  return (
    <Popover
      content={<CBSCardPopover set={set} />}
      placement="top"
      showArrow={false}
      title={set.name}
      trigger="click"
    >
      <StyledWrapper>
        <CBSIcon set={set} percentageOwned={percentageOwned} />
        <Typography.Text>{set.name}</Typography.Text>
      </StyledWrapper>
    </Popover>
  );
};

export default CBSCard;
