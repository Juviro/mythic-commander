import styled, { css } from 'styled-components';
import { POISON_IMAGE } from '../../PlayerName/Avatar';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  max-height: ${({ height }) => height}px;
  border: 1px solid black;
  background-color: ${({ color }) => color};

  color: #fff;
  text-shadow: 2px 2px 0px #333;

  ${({ img }) =>
    img
      ? css`
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${img});
        `
      : ''}
    ${({ isInfect }) =>
      isInfect
        ? css`
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0px 63%;
            background-image: url(${POISON_IMAGE});
          `
        : ''}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth};
    `}
`;
