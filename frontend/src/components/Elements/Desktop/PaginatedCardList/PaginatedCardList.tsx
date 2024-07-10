import React, { useEffect } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';

import styled from 'styled-components';
import { Empty, Typography } from 'antd';
import { UnifiedCard } from 'types/unifiedTypes';
import Flex from '../../Shared/Flex';
import CardGrid from '../../Shared/CardGrid';
import Header from './Header';
import useLocalStorage from '../../../Hooks/useLocalStorage';

const StyledEmpty = styled(Empty)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface Props {
  cards?: UnifiedCard[];
  loading?: boolean;
  error?: string;
  numberOfCards?: number;
  search?: string;
  showAddedBeforeFilter?: boolean;
  showCollectionFilters?: boolean;
  title?: string;
  onEditCard?: (card: UnifiedCard) => void;
  deleteByOracle?: (oracleIds: string[], numberOfCards: number) => void;
  setSearch?: (search: string) => void;
}

export default ({
  cards,
  loading,
  error,
  numberOfCards,
  setSearch,
  search,
  showAddedBeforeFilter,
  showCollectionFilters,
  title,
  onEditCard,
  deleteByOracle,
}: Props) => {
  const [initialPageSize, setInitialPageSize] = useLocalStorage('pageSize', 25);
  const [pageSize, setPageSize] = useQueryParam('pageSize', NumberParam);

  useEffect(() => {
    if (!pageSize) {
      setPageSize(initialPageSize);
    } else {
      setInitialPageSize(pageSize);
    }
    // eslint-disable-next-line
  }, [pageSize]);

  const cardList =
    cards.length || loading ? (
      <CardGrid
        error={error}
        search={search}
        cards={cards}
        loading={loading}
        numberOfCards={numberOfCards}
        onEditCard={onEditCard}
        deleteByOracle={deleteByOracle}
      />
    ) : (
      <StyledEmpty description="No cards found" />
    );

  return (
    <Flex direction="column">
      {title && (
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ width: '100%', marginTop: -16, marginBottom: 16 }}
        >
          <Typography.Title level={2} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </Flex>
      )}
      <Header
        setSearch={setSearch}
        showAddedBeforeFilter={showAddedBeforeFilter}
        showCollectionFilters={showCollectionFilters}
      />
      {cardList}
    </Flex>
  );
};
