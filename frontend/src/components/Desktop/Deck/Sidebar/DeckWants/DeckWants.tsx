import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useLazyQuery } from 'react-apollo';

import { wantsListsForDeck } from './queries';
import { Query, QueryWantsListsArgs } from 'types/graphql';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {
  visible: boolean;
}

export default ({ visible }: Props) => {
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

  console.log('data :', data?.wantsLists);
  const wantsLists = data?.wantsLists;

  return <StyledWrapper>Coming soon</StyledWrapper>;
};
