import styled, { css } from 'styled-components';

const Flex = styled.div`
  display: flex;
  ${props =>
    props.direction === 'column'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
        `};
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  ${props =>
    props.flex &&
    css`
      flex: ${props.flex};
    `};
  ${props =>
    props.wrap &&
    css`
      flex-wrap: ${props.wrap};
    `};
  ${props =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `};
`;

export default Flex;
