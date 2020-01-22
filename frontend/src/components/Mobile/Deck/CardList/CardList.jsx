import React from 'react';
import { List, Typography } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import CardIcon from '../../../Elements/Card/Preview/CardIcon';
// import CardListHeader from './CardListHeader';

const StyledListItem = styled(List.Item)`
  display: flex;
  flex-direction: row;
  padding: 4px 8px;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const DeckList = ({ deck: { cards } }) => {
  console.log('TCL: DeckList -> cards', cards);
  return (
    <List
      // header={<CardListHeader deck={deck} />}
      dataSource={cards || []}
      style={{ width: '100%' }}
      renderItem={card => (
        <StyledListItem>
          <Left>
            <CardIcon card={card} />
            <Typography.Text ellipsis style={{ fontSize: 14, width: '100%', marginLeft: 16 }}>
              {card.name}
            </Typography.Text>
          </Left>
        </StyledListItem>
      )}
    />
  );
};

export default withRouter(DeckList);
