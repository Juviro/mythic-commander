import styled, { css } from 'styled-components';

interface Props {
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reversed';
  flex?: number | string;
  style?: React.CSSProperties;
  gap?: number;
}

const Flex = styled.div`
  display: flex;
  ${(props: Props) =>
    props.direction === 'column'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
        `};
  ${(props: Props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `};
  ${(props: Props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `};
  ${(props: Props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `};
  ${(props: Props) =>
    props.wrap &&
    css`
      flex-wrap: ${props.wrap};
    `};
  ${(props: Props) =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `};
`;

export default Flex;
