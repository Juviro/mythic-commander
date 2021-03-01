import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import shimmer from 'components/Animations/shimmer';

import { CardGridSkeleton } from './CardGridSkeleton';
import { MobileCardGridSkeleton } from './MobileCardGridSkeleton';
import { CardListSkeleton } from './CardListSkeleton';

const StyledImagePreview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4%;
  ${shimmer};
`;

const StyledLine = styled.div`
  ${shimmer};
`;

export const Line = ({ style = {}, height = 32 }) => (
  <StyledLine style={{ ...style, height }} />
);

export const List = CardListSkeleton;
export const Grid = CardGridSkeleton;
export const GridMobile = MobileCardGridSkeleton;
export const CardImage = () => <StyledImagePreview />;

export default () => <Skeleton active />;
