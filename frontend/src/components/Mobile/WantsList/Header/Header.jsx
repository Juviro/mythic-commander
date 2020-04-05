import React from 'react';
import styled from 'styled-components';

import { Row, Col, Typography } from 'antd';
import { withRouter } from 'react-router';
import { LinkOutlined } from '@ant-design/icons';
import Menu from './Menu';
import Stats from './Stats';
import Title from './Title';
import LinkDeck from './LinkDeck';

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  font-size: 26px;
  justify-content: space-between;
`;

const StyledDeckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    history.push(`/m/decks/${deck.id}`);
  };

  return (
    <>
      <StyledTitleWrapper>
        <Title wantsList={wantsList} />
        {wantsList && <Menu canUnlink={Boolean(deck)} />}
      </StyledTitleWrapper>
      <Row>
        <Col span={12}>
          <Stats wantsList={wantsList} />
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {deck ? (
            <StyledDeckWrapper onClick={onClickDeck}>
              <DeckPreview src={deck.imgSrc} />
              <span>
                <LinkOutlined style={{ marginRight: 8 }} />
                <Typography.Text>{deck.name}</Typography.Text>
              </span>
            </StyledDeckWrapper>
          ) : (
            <LinkDeck wantsList={wantsList} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default withRouter(Header);
