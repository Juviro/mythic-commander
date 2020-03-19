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
