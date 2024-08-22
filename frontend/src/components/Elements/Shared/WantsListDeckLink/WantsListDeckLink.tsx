import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';

import { UnifiedWantsList } from 'types/unifiedTypes';
import { addBaseUrlToImg } from 'utils/cardImage';
import getDynamicUrl from '../../../../utils/getDynamicUrl';

import LinkDeck from './LinkDeck';

const StyledDeckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const StyledLink = styled.span<{ large: boolean }>`
  margin-top: 8px;
  font-size: ${({ large }) => (large ? 18 : 14)}px;
`;

const DeckPreview = styled.img<{ large: boolean }>`
  width: ${({ large }) => (large ? 210 : 120)}px;
  height: ${({ large }) => (large ? 153 : 88)}px;
  border-radius: 4px;
`;

interface Props extends RouteComponentProps {
  wantsList: UnifiedWantsList;
  large?: boolean;
  canEdit?: boolean;
}

const WantsListDeckLink = ({ wantsList, history, large, canEdit }: Props) => {
  const deck = wantsList && wantsList.deck;

  const onClickDeck = () => {
    if (!deck) return;
    history.push(getDynamicUrl(`/decks/${deck.id}`));
  };

  if (!deck && !canEdit) return null;
  if (!deck) return <LinkDeck wantsList={wantsList} large={large} />;

  return (
    <StyledDeckWrapper>
      <DeckPreview
        src={addBaseUrlToImg(deck.imgSrc)}
        large={large}
        onClick={onClickDeck}
      />
      <StyledLink large={large}>
        <Typography.Link
          ellipsis
          style={{ maxWidth: large ? 210 : 120 }}
          onClick={onClickDeck}
        >
          {deck.name}
        </Typography.Link>
      </StyledLink>
    </StyledDeckWrapper>
  );
};

export default withRouter(WantsListDeckLink);
