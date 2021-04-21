import React from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';

import { primary } from 'constants/colors';
import { useToggle } from 'components/Hooks';
import { SetDeckImage } from 'components/Elements/Shared';
import shimmer from 'components/Animations/shimmer';

const StyledEditIcon = styled(EditOutlined)`
  opacity: 0;
  transition: all 0.2s;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  right: 8px;
  top: 8px;
  color: ${primary};
  cursor: pointer;
  z-index: 1;
`;

const StyledWrapper = styled.div`
  width: 200px;
  height: 140px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &:hover ${StyledEditIcon} {
    opacity: 1;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledPlaceholder = styled.div`
  ${shimmer};
  height: 100%;
`;

export default ({ deck }) => {
  const [isEditing, toggleIsEditing] = useToggle();

  if (!deck)
    return (
      <StyledWrapper>
        <StyledPlaceholder />
      </StyledWrapper>
    );

  return (
    <>
      <StyledWrapper>
        <StyledEditIcon onClick={toggleIsEditing} />
        <StyledImage src={deck.imgSrc} />
      </StyledWrapper>
      <SetDeckImage visible={isEditing} onClose={toggleIsEditing} deck={deck} />
    </>
  );
};
