import React, { useRef } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import LayoutPicker from '../LayoutPicker';
import NameFilter from '../Filter/TextFilter/NameFilter';
import { useShortcut } from '../../Hooks';
import SortPicker from '../SortPicker';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`;

export default ({ showSorter }) => {
  const inputRef = useRef(null);
  useShortcut('f', () => inputRef.current.focus());

  return (
    <StyledWrapper>
      <Tooltip title="Filter for name [F]">
        <StyledSearchWrapper>
          <NameFilter size="normal" inputRef={inputRef} />
        </StyledSearchWrapper>
      </Tooltip>
      <span>
        {showSorter && (
          <SortPicker style={{ marginRight: 16 }} showCollectionFilters />
        )}
        <LayoutPicker hideCard />
      </span>
    </StyledWrapper>
  );
};
