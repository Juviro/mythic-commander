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
  ${props =>
    props.align &&
    css`
      align-items: ${props.align};
    `};
  ${props =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `};
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
`;

export default Flex;
