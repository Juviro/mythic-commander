import React from 'react';
import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import CustomSkeleton from '../CustomSkeleton';
import getDynamicUrl from '../../../../utils/getDynamicUrl';
import Flex from '../Flex';
import AddToDeck from './AddToDeck';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const StyledPreview = styled.img`
  width: 38px;
  height: auto;
  margin-right: 8px;
  border-radius: 2px;
`;

const NEW_DECK_DUMMY_ID = 'new-deck';

const DeckLink = ({ id, name }) => {
  if (id === NEW_DECK_DUMMY_ID) return name;
  return (
    <Link to={getDynamicUrl(`/decks/${id}`)}>
      <Typography.Text
        ellipsis
        style={{
          color: 'inherit',
          maxWidth: '100%',
        }}
      >
        {name}
      </Typography.Text>
    </Link>
  );
};

export default ({ card, large }) => {
  if (!card || !card.containingDecks) return <CustomSkeleton.Line />;

  const { containingDecks } = card;

  const dataSource = [...containingDecks].sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <StyledWrapper>
      <AddToDeck cardIds={[card?.id]} oracle_id={card?.oracle_id} />
      {containingDecks.length ? (
        <List
          rowKey="id"
          size="small"
          style={{ margin: '16px 0 24px' }}
          dataSource={dataSource}
          renderItem={({ id, name, imgSrc }) => (
            <List.Item style={{ padding: large ? 8 : 4 }}>
              <Flex align="center">
                <StyledPreview src={imgSrc} />
                <DeckLink id={id} name={name} />
              </Flex>
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text type="secondary">
          You don&apos;t have any deck containing this card
        </Typography.Text>
      )}
    </StyledWrapper>
  );
};
