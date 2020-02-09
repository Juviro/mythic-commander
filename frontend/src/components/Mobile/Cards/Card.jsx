import React from 'react';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import { List, Typography } from 'antd';

const StyledListItem = styled(List.Item)`
  width: 100%;
  display: flex;
  margin: 2px 4px;
  padding: 2px 4px;
  min-height: 36px;
  align-items: end;
  line-height: 36px;
  border-radius: 4px;
  flex-direction: row;
`;

const StyledPreview = styled.img`
  height: auto;
  width: 26px;
  margin-right: 12px;
`;

const Card = ({ card, history }) => {
  // TODO: unify this function
  const image =
    card.img ||
    (card.image_uris
      ? card.image_uris.small
      : card.card_faces[0].image_uris.small);
  const onClick = () => {
    history.push(`/m/cards/${card.id}`);
  };
  return (
    <StyledListItem onClick={onClick}>
      <StyledPreview src={image} />
      <Typography.Text style={{ display: 'block' }} ellipsis>
        {card.name}
      </Typography.Text>
    </StyledListItem>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isOpen !== nextProps.isOpen) return false;
  return ['id', 'amount', 'isFoil'].every(propKey => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(withRouter(Card, areEqual));
