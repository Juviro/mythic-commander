import React from 'react';
import styled from 'styled-components';

import MenuDesktop from 'components/Desktop/Menu';
import MenuMobile from 'components/Mobile/Menu';
import LoadingIcon from './LoadingIcon';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  menu: 'desktop' | 'mobile';
}

const SuspensePlaceholder = ({ menu }: Props) => {
  return (
    <>
      {menu === 'desktop' && <MenuDesktop />}
      {menu === 'mobile' && <MenuMobile />}
      <StyledWrapper>
        <LoadingIcon />
      </StyledWrapper>
    </>
  );
};

export default SuspensePlaceholder;
