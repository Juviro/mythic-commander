import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useLazyQuery } from 'react-apollo';

import { Query, QueryWantsListsArgs, CardInputType } from 'types/graphql';
import { wantsListsForDeck } from './queries';
import WantsListsCollapse from './WantsListsCollapse';
import { UnifiedDeck } from '../../Deck';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

interface Props {
  visible: boolean;
  deck: UnifiedDeck;
  onAddCards: (newCards: CardInputType[], name: string) => void;
}

export default ({ visible, deck }: Props) => {
  const { id: deckId } = useParams();
  const [fetchCards, { called, data, loading }] = useLazyQuery<
    Query,
    QueryWantsListsArgs
  >(wantsListsForDeck, {
    variables: { deckId },
  });

  useEffect(() => {
    if (!visible || called) return;
    fetchCards();
  }, [visible]);

  const wantsLists = data?.wantsLists;

  return (
    <StyledWrapper>
      <WantsListsCollapse wantsLists={wantsLists} deck={deck} />
    </StyledWrapper>
  );
};
