import React from 'react';
import { List, Typography } from 'antd';
import styled from 'styled-components';
import CardIcon from '../../../../Elements/Card/Preview/CardIcon';
import SublistHeader from './SublistHeader';
import { isCardLegal } from '../../../../../utils/cardStats';

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

export default ({ cards, type, commander }) => {
  if (!cards || !cards.length) return null;
  const dataSource = cards.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <List
      header={<SublistHeader type={type} numberOfCards={cards.length} />}
      dataSource={dataSource}
      style={{ width: '100%' }}
      renderItem={card => (
        <StyledListItem className={isCardLegal(card, commander) ? '' : 'not-legal'}>
          <Left>
            <CardIcon card={card} />
            <Typography.Text ellipsis style={{ fontSize: 14, width: '100%', marginLeft: 16 }}>
              {card.name}
            </Typography.Text>
          </Left>
          {card.amount > 1 && <span>{`${card.amount}x`}</span>}
        </StyledListItem>
      )}
    />
  );
};
