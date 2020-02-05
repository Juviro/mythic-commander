import React from 'react';
import { List, Typography, Icon } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useMutation } from 'react-apollo';
import { createDeck as createDeckMutation } from '../../../queries';

const StyledImage = styled.img`
  margin: 0 16px 0 0;
  border-radius: 3px;
  overflow: hidden;
  height: 46px;
  min-width: 63px;
  max-width: 63px;
  display: block;
`;

const StyledAddIcon = styled(Icon)`
  margin: 0 16px 0 0;
  border-radius: 3px;
  height: 46px;
  width: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eaeaea;
  font-size: 24px;
`;

const StyledHeader = styled.div`
  margin-left: 16px;
`;

const StyledListItem = styled(List.Item)`
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DeckListItem = ({ onClick, image, name, showRightIcon }) => (
  <StyledListItem onClick={onClick}>
    <Left>
      {image}
      <Typography.Text ellipsis strong style={{ fontSize: 16 }}>
        {name}
      </Typography.Text>
    </Left>
    {showRightIcon && <Icon type="right" />}
  </StyledListItem>
);

const DeckList = ({ decks, history }) => {
  const [mutate] = useMutation(createDeckMutation);
  const onOpenDeck = id => {
    history.push(`/m/decks/${id}`);
  };
  const onAddDeck = async () => {
    const { data } = await mutate();
    onOpenDeck(data.createDeck.id);
  };

  const deckComponents = decks.map(deck => (
    <DeckListItem
      showRightIcon
      name={deck.name}
      onClick={() => onOpenDeck(deck.id)}
      image={<StyledImage src={deck.imgSrc} alt={`${deck.name} cover`} />}
    />
  ));

  const addDeckComponent = (
    <DeckListItem
      name="Create deck"
      onClick={onAddDeck}
      image={<StyledAddIcon type="plus" />}
    />
  );

  return (
    <List
      header={<StyledHeader>Your Decks</StyledHeader>}
      dataSource={[addDeckComponent, ...deckComponents]}
      style={{ width: '100%' }}
      renderItem={deck => deck}
    />
  );
};

export default withRouter(DeckList);
