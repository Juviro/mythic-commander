import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import shimmer from 'components/Animations/shimmer';

import { CardGridSkeleton } from './CardGridSkeleton';
import { CardListSkeleton } from './CardListSkeleton';

const StyledImagePreview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4%;
  ${shimmer};
`;

export const Line = ({ style = {} }) => (
  <Skeleton active paragraph={null} style={style} />
);

export const List = CardListSkeleton;
export const Grid = CardGridSkeleton;
export const CardImage = () => <StyledImagePreview />;

export default () => <Skeleton active />;
