import React from 'react';
import styled from 'styled-components';
import {
  primary,
  primaryHover,
  primaryActive,
} from '../../../../../constants/colors';

const StyledTab = styled.div`
  width: 40px;
  height: 140px;
  cursor: pointer;
  position: relative;
  background-color: ${({ active }) => (active ? primary : 'white')};
  color: ${({ active }) => (active ? 'white' : primary)};
  box-shadow: 2px 0px 4px 0px #9c9c9c;
  z-index: ${({ index }) => 5 - index};
  transition: all 0.3s;

  &:hover {
    background-color: ${primaryHover};
    color: white;
  }
  &:active {
    background-color: ${primaryActive};
    color: white;
  }
`;

const StyledTitle = styled.div`
  height: 50px;
  width: 140px;
  font-size: 16px;
  font-weight: 500;
  transform-origin: bottom;
  transform: rotate(270deg);
  left: -12px;
  position: absolute;
  bottom: 90px;
`;

export default ({ active, title, index, onClick }) => {
  return (
    <StyledTab active={active} index={index} onClick={onClick}>
      <StyledTitle>{title}</StyledTitle>
    </StyledTab>
  );
};
