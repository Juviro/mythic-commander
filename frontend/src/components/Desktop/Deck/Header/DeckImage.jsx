import React from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';

import { useToggle } from '../../../Hooks';
import { primary } from '../../../../constants/colors';
import { SetDeckImage } from '../../../Elements/Shared';

const StyledEditIcon = styled(EditOutlined)`
  display: none;
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
  background-color: #cecece;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  &:hover ${StyledEditIcon} {
    display: flex;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default ({ deck }) => {
  const [isEditing, toggleIsEditing] = useToggle(true);
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
