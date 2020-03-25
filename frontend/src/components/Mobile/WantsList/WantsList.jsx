import React, { useEffect } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';
import { wantsList as wantsListQuery } from './queries';

import Header from './Header';
import AddWants from './AddWants';
import CardModal from '../Card/CardModal';
import { ListOrder } from '../../Elements';
import CardsList from './CardsList';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(wantsListQuery, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const wantsList = data && data.wantsList;
  const cards = wantsList && wantsList.cards;
  const basePath = `/m/wants/${id}`;

  useEffect(() => {
    if (!loading) return;
    setTimeout(() => window.scrollTo(0, 0), 100);
    // eslint-disable-next-line
  }, [loading]);

  return (
    <StyledWrapper>
      <Header wantsList={wantsList} />
      <ListOrder showCollectionFilters />
      <Divider />
      <CardsList
        cards={cards}
        loading={loading}
        basePath={basePath}
        wantsList={wantsList}
      />
      <AddWants containedCards={cards} />
      <CardModal basePath={basePath} />
    </StyledWrapper>
  );
};
