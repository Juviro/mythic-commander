import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import styled from 'styled-components';
import { Empty } from 'antd';
import Flex from '../../Shared/Flex';
import CardTable from './CardTable';
import CardGrid from './CardGrid';
import Header from './Header';
import FullscreenSpinner from '../../Shared/Spinner';
import useLocalStorage from '../../../Hooks/useLocalStorage';

const StyledEmpty = styled(Empty)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ({
  cards,
  loading,
  widthOffset,
  numberOfCards,
  showSorter,
  hiddenColumns,
}) => {
  const [zoom, setZoom] = useLocalStorage('zoom', 100);
  const [layout] = useQueryParam('layout', StringParam);
  const width = `calc(100% - ${widthOffset}px)`;
  const isEmptySearch = !loading && !cards.length;
  console.log('isEmptySearch :', isEmptySearch);

  const cardList = isEmptySearch ? (
    <StyledEmpty description="No cards found" />
  ) : layout === 'list' ? (
    <CardTable
      cards={cards}
      loading={loading}
      showSorter={showSorter}
      hiddenColumns={hiddenColumns}
      numberOfCards={numberOfCards}
    />
  ) : (
    <CardGrid
      zoom={zoom}
      cards={cards}
      loading={loading}
      widthOffset={widthOffset}
      numberOfCards={numberOfCards}
    />
  );

  return (
    <Flex
      direction="column"
      style={{
        width,
        overflowY: 'auto',
        padding: 24,
        transition: 'width 0.2s',
      }}
    >
      <Header
        showZoomSlider={layout === 'grid'}
        zoom={zoom}
        setZoom={setZoom}
      />
      {loading && !cards.length ? <FullscreenSpinner /> : cardList}
    </Flex>
  );
};
