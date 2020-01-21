import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const ImageWrapper = styled.div`
  height: 183px;
  min-width: 250px;
  max-width: 250px;
  border-radius: 8px;
  margin: 30px 30px 10px;
  overflow: hidden;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.1s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  display: block;
  box-shadow: 0 0 5px #8c8888;

  &:hover {
    box-shadow: 0px 2px 6px #383535;
    transform: scale(1.04);
  }
  &:active {
    box-shadow: 0px 2px 6px #8c8989;
    transform: scale(1.02);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  min-height: 100%;
  transition: all 0.2s ease-out;

  &:hover {
    transition: all 1s ease-out;
    transform: scale(1.15);
  }
`;

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
  font-weight: 900;
`;

export default ({ imgSrc, name, onOpenDeck }) => {
  // TODO spin when img not loaded
  return (
    <StyledPreview>
      <ImageWrapper>{imgSrc ? <StyledImage src={imgSrc} onClick={onOpenDeck} /> : <Spin />}</ImageWrapper>
      <b>{name}</b>
    </StyledPreview>
  );
};
