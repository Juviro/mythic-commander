import React from 'react';
import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { CustomSkeleton } from '../../Elements';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledPreview = styled.img`
  width: 38px;
  height: auto;
  margin-right: 8px;
  border-radius: 2px;
`;

export default ({ card }) => {
  if (!card) return <CustomSkeleton.Line />;

  const { containingDecks } = card;

  if (!containingDecks.length)
    return (
      <Typography.Text type="secondary">
        You don&apos;t have any deck containing this card
      </Typography.Text>
    );

  const dataSource = containingDecks.sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <StyledWrapper>
      <List
        size="small"
        dataSource={dataSource}
        renderItem={({ id, name, imgSrc }) => (
          <List.Item style={{ padding: 4 }}>
            <span>
              <StyledPreview src={imgSrc} />
              <Link to={`/m/decks/${id}`}>{name}</Link>
            </span>
          </List.Item>
        )}
      />
    </StyledWrapper>
  );
};
