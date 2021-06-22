import React from 'react';
import styled from 'styled-components';

import WantsListDeckLink from 'components/Elements/Shared/WantsListDeckLink';
import WantsListTitle from 'components/Elements/Shared/WantsListTitle';
import ListStats from 'components/Elements/Shared/ListStats';
import Flex from 'components/Elements/Shared/Flex';
import Menu from './Menu';

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  font-size: 26px;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export default ({ wantsList, canEdit }) => {
  return (
    <>
      <StyledTitleWrapper>
        <WantsListTitle wantsList={wantsList} canEdit={canEdit} />
        {wantsList && <Menu wantsList={wantsList} canEdit={canEdit} />}
      </StyledTitleWrapper>
      <Flex direction="row" justify="space-between" style={{ margin: '0 8px' }}>
        <ListStats list={wantsList} />
        <WantsListDeckLink wantsList={wantsList} canEdit={canEdit} />
      </Flex>
    </>
  );
};
