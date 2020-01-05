import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';

import SearchField from '../SearchField';
import MultiInput from './MultIinput';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const StyledSearchSection = styled.div`
  height: 100%;
  display: block;
`;

export default ({ isVisible, setIsVisible, onAddCards }) => {
  const searchInput = React.createRef();

  const afterVisibleChange = visible => {
    if (!visible) return;
    searchInput.current.focus();
  };

  return (
    <Drawer
      width={300}
      mask={false}
      placement="left"
      title="Add Cards"
      visible={isVisible}
      maskClosable={false}
      onClose={() => setIsVisible(false)}
      afterVisibleChange={afterVisibleChange}
    >
      <StyledWrapper>
        <StyledSearchSection>
          <SearchField ref={searchInput} onSearch={card => onAddCards([card])} defaultActiveFirstOption resetSearch />
          <MultiInput onAddCards={onAddCards} />
        </StyledSearchSection>
      </StyledWrapper>
    </Drawer>
  );
};
