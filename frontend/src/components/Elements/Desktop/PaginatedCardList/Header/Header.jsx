import React, { useRef } from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { useQueryParam, StringParam } from 'use-query-params';

import { LayoutPicker, SortPicker, Flex } from '../../../Shared';
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
  showNameSearch,
  showZoomSlider,
  zoom,
  setZoom,
  showCollectionFilters,
  orderByParamName,
}) => {
  const [name, setName] = useQueryParam('name', StringParam);
  const searchInputRef = useRef(null);
  const focusInput = () => searchInputRef.current.focus();
  useShortcut('f', focusInput);

  return (
    <StyledWrapper>
      <Flex direction="row">
        <SortPicker
          showCollectionFilters={showCollectionFilters}
          paramName={orderByParamName}
        />
        {showNameSearch && (
          <Tooltip title="Filter for card name [F]">
            <span>
              <NameFilter
                inputRef={searchInputRef}
                style={{ marginLeft: 16 }}
                value={name}
                onChange={setName}
                size="middle"
                placeholder="Search for a card"
              />
            </span>
          </Tooltip>
        )}
      </Flex>
      <Flex direction="row">
        {showZoomSlider && <ZoomSlider zoom={zoom} setZoom={setZoom} />}
        <LayoutPicker hideCard />
      </Flex>
    </StyledWrapper>
  );
};
