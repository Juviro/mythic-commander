import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import uniqid from 'uniqid';

import { FriendsCollectionSet } from 'types/graphql';
import SetIcon from '../SetIcon';
import Flex from '../Flex';

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0 0 0 18px;
  margin: -16px 0 0;
`;

const StyledElement = styled.li<{ active: boolean }>`
  padding: 2px 4px;
  color: #1677ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) =>
    props.active ? 'rgb(228, 240, 255) !important' : 'transparent'};

  &:hover {
    background-color: #fafafa;
  }
`;

interface Props {
  sets: FriendsCollectionSet[];
  selectedCardId?: string;
  setSelectedCardId?: (id: string) => void;
}

const FriendsCollectionEntry = ({ sets, setSelectedCardId, selectedCardId }: Props) => {
  return (
    <StyledList>
      {sets.map(({ set, amount, amountFoil, set_name, id }) => (
        <StyledElement
          key={uniqid()}
          onClick={() => setSelectedCardId?.(id)}
          role="button"
          active={selectedCardId === id}
        >
          <Flex align="center">
            <SetIcon setKey={set} />
            <Typography.Text ellipsis style={{ maxWidth: 180, color: 'inherit' }}>
              {set_name}
            </Typography.Text>
          </Flex>
          <div>
            <Typography.Text>{amount + amountFoil}</Typography.Text>
            <Typography.Text type="secondary"> ({amountFoil} foil)</Typography.Text>
          </div>
        </StyledElement>
      ))}
    </StyledList>
  );
};

export default FriendsCollectionEntry;
