import React from 'react';
import { List, Typography, Icon } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const StyledImage = styled.img`
  margin: 0 16px 0 0;
  border-radius: 3px;
  overflow: hidden;
  height: 46px;
  min-width: 63px;
  max-width: 63px;
  display: block;
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

const DeckList = ({ decks, history }) => {
  const onOpenDeck = id => {
    history.push(`/m/deck/${id}`);
  };

  return (
    <List
      header={<StyledHeader>Your Decks</StyledHeader>}
      dataSource={decks}
      style={{ width: '100%' }}
      renderItem={deck => (
        <StyledListItem onClick={() => onOpenDeck(deck.id)}>
          <Left>
            <StyledImage src={deck.imgSrc} alt={`${deck.name} cover`} />
            <Typography.Text ellipsis strong style={{ fontSize: 16 }}>
              {deck.name}
            </Typography.Text>
          </Left>
          <div>
            <Icon type="right" />
          </div>
        </StyledListItem>
      )}
    />
  );
};

export default withRouter(DeckList);
