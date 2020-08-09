import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledFullscreenModalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const FullscreenModal = React.createContext({});

export const FullscreenModalProvider = ({ children }) => {
  const containerRef = useRef(null);

  return (
    <FullscreenModal.Provider
      value={{
        getContainer: () => containerRef?.current,
      }}
    >
      <StyledFullscreenModalContainer ref={containerRef}>
        {children}
      </StyledFullscreenModalContainer>
    </FullscreenModal.Provider>
  );
};

export default FullscreenModal;
