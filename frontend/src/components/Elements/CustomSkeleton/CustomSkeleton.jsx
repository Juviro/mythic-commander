import React from 'react';
import { Skeleton, List as AntdList } from 'antd';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
`;

const StyledImagePreview = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4%;
  background-size: 400% 100%;
  background: linear-gradient(90deg, #f2f2f2 25%, #e8e8e8 37%, #f2f2f2 63%);
`;

export const Line = ({ style = {} }) => (
  <Skeleton active paragraph={null} style={style} />
);

export const List = () => {
  const dummyArray = [];
  for (let i = 0; i < 10; i++) {
    dummyArray.push(true);
  }

  return (
    <SkeletonWrapper>
      <AntdList
        style={{ width: '100%' }}
        dataSource={dummyArray}
        renderItem={() => <Skeleton active paragraph={null} />}
      />
    </SkeletonWrapper>
  );
};

export const CardImage = () => <StyledImagePreview />;

export default () => <Skeleton active />;
