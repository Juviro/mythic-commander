import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { greyBorder } from 'constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div<{ isLeft: boolean }>`
  width: 32px;
  height: 620px;
  max-height: 100%;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 2px;

  ${({ isLeft }) => (isLeft ? 'left: 4px' : 'right: 18px')};
`;

const StyledButton = styled(Button)`
  height: 200px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  color: ${greyBorder};
`;

interface Props {
  type: 'next' | 'previous';
  onClick: () => void;
}

export const NavigationButton = ({ type, onClick }: Props) => {
  return (
    <StyledWrapper isLeft={type === 'previous'}>
      <StyledButton onClick={onClick}>
        {type === 'next' ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </StyledButton>
    </StyledWrapper>
  );
};
