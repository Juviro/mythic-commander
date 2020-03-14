import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { PlusOutlined } from '@ant-design/icons';
import { createDeck as createDeckMutation } from '../../../queries';

const StyledIcon = styled(PlusOutlined)`
  font-size: 70px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const StyledPreview = styled.div`
  flex: 1;
  margin: 30px;
  display: flex;
  height: 183px;
  min-width: 250px;
  max-width: 250px;
  color: #7b7b7b;
  border-radius: 8px;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  flex-direction: column;
  transition: all 0.1s linear;
  box-shadow: 0 0 5px #8c8888;

  &:hover {
    box-shadow: 0px 2px 6px #8c8989;
    transform: scale(1.05);
  }
  &:active {
    box-shadow: 0px 2px 6px #8c8989;
    transform: scale(1.03);
  }
`;

export default ({ onOpenDeck }) => {
  const [mutate] = useMutation(createDeckMutation);
  const onAddDeck = async () => {
    const { data } = await mutate();
    onOpenDeck(data.createDeck.id);
  };
  return (
    <StyledPreview onClick={onAddDeck}>
      <StyledIcon />
      <b>Add new Deck</b>
    </StyledPreview>
  );
};
