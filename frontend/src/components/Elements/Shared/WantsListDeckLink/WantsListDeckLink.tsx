import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';

import { UnifiedWantsList } from 'types/unifiedTypes';
import { addBaseUrlToImg } from 'utils/cardImage';
import getDynamicUrl from '../../../../utils/getDynamicUrl';

import LinkDeck from './LinkDeck';

const StyledDeckWrapper = styled.a`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const StyledLink = styled.span<{ large: boolean }>`
  margin-top: 8px;
  font-size: ${({ large }) => (large ? 18 : 14)}px;
  max-width: ${({ large }) => (large ? 210 : 120)}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeckPreview = styled.img<{ large: boolean }>`
  width: ${({ large }) => (large ? 210 : 120)}px;
  height: ${({ large }) => (large ? 153 : 88)}px;
  border-radius: 4px;
  text-decoration: underline;
`;

interface Props extends RouteComponentProps {
  wantsList: UnifiedWantsList;
  large?: boolean;
  canEdit?: boolean;
}

const WantsListDeckLink = ({ wantsList, large, canEdit }: Props) => {
  const deck = wantsList && wantsList.deck;

  if (!deck && !canEdit) return null;
  if (!deck) return <LinkDeck wantsList={wantsList} large={large} />;

  return (
    <StyledDeckWrapper href={getDynamicUrl(`/decks/${deck.id}`)}>
      <DeckPreview src={addBaseUrlToImg(deck.imgSrc)} large={large} />
      <StyledLink large={large}>{deck.name}</StyledLink>
    </StyledDeckWrapper>
  );
};

export default withRouter(WantsListDeckLink);
