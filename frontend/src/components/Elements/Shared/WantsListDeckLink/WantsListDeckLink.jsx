import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { withRouter } from 'react-router';
import { LinkOutlined } from '@ant-design/icons';

import getDynamicUrl from '../../../../utils/getDynamicUrl';

import LinkDeck from './LinkDeck';

const StyledDeckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const DeckPreview = styled.img`
  width: 120px;
  height: 84px;
  margin: 4px 8px;
  border-radius: 4px;
`;

const Header = ({ wantsList, history }) => {
  const deck = wantsList && wantsList.deck;

  const onClickDeck = () => {
    if (!deck) return;
    history.push(getDynamicUrl(`/decks/${deck.id}`));
  };

  return deck ? (
    <StyledDeckWrapper onClick={onClickDeck}>
      <DeckPreview src={deck.imgSrc} />
      <span>
        <LinkOutlined style={{ marginRight: 8 }} />
        <Typography.Text>{deck.name}</Typography.Text>
      </span>
    </StyledDeckWrapper>
  ) : (
    <LinkDeck wantsList={wantsList} />
  );
};

export default withRouter(Header);
