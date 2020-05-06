import React, { useRef, useState } from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';

import {
  LayoutPicker,
  OrderBy,
  Flex,
  AddedBeforeFilter,
} from '../../../Shared';
import ZoomSlider from './ZoomSlider';
import NameFilter from '../../../Shared/Filter/TextFilter/NameFilter';
import { useShortcut } from '../../../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default ({
  setSearch,
  showZoomSlider,
  zoom,
  setZoom,
  showCollectionFilters,
  orderByParamName,
  showAddedBeforeFilter,
}) => {
  const searchInputRef = useRef(null);
  const [currentSearch, setCurrentSearch] = useState('');
  const focusInput = () => searchInputRef.current.focus();
  useShortcut('f', focusInput);

  const onSearch = () => {
    setSearch(currentSearch);
  };

  return (
    <StyledWrapper>
      <Flex direction="row">
        <OrderBy
          showCollectionFilters={showCollectionFilters}
          paramName={orderByParamName}
        />
        {setSearch && (
          <Tooltip title="Filter for card name [F]">
            <span>
              <NameFilter
                onSearch={onSearch}
                inputRef={searchInputRef}
                style={{ marginLeft: 16 }}
                value={currentSearch}
                onChange={setCurrentSearch}
                size="middle"
                placeholder="Search for a card"
              />
            </span>
          </Tooltip>
        )}
        {showAddedBeforeFilter && <AddedBeforeFilter />}
      </Flex>
      <Flex direction="row">
        {showZoomSlider && <ZoomSlider zoom={zoom} setZoom={setZoom} />}
        <LayoutPicker hideCard />
      </Flex>
    </StyledWrapper>
  );
};
