import React from 'react';
import styled from 'styled-components';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

import { primary, lightWhite } from 'constants/colors';

const StyledWrapper = styled.div<{ visible: boolean; isHovering: boolean }>`
  position: absolute;
  top: 26px;
  left: 12px;
  z-index: 99;
  font-size: 24px;
  cursor: pointer;

  display: ${({ visible }) => (visible ? 'block' : 'none')};

  &:hover {
    transform: scale(1.05);
  }

  ${({ isHovering }) => isHovering && 'transform: scale(1.05);'}
`;

interface Props {
  isSelected: boolean;
  isAnyCardSelected: boolean;
  isHovering: boolean;
  onSelect: () => void;
}

const Icon = ({ isSelected, isHovering, isAnyCardSelected }) => {
  if (isSelected) {
    return (
      <CheckCircleFilled
        style={{
          color: primary,
          borderRadius: '50%',
          backgroundColor: lightWhite,
        }}
      />
    );
  }
  if (isHovering && isAnyCardSelected) {
    return (
      <CheckCircleFilled
        style={{
          color: lightWhite,
        }}
      />
    );
  }

  return <CheckCircleOutlined style={{ color: lightWhite }} />;
};

export const SelectButton = ({
  isSelected,
  onSelect,
  isAnyCardSelected,
  isHovering,
}: Props) => {
  const onClick = (e) => {
    e.stopPropagation();
    onSelect();
  };

  const visible = isAnyCardSelected || isHovering;

  return (
    <StyledWrapper
      visible={visible}
      onClick={onClick}
      isHovering={isAnyCardSelected && isHovering}
    >
      <Icon
        isHovering={isHovering}
        isSelected={isSelected}
        isAnyCardSelected={isAnyCardSelected}
      />
    </StyledWrapper>
  );
};
