import React from 'react';
import styled from 'styled-components';
import { Skeleton, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${({ isLegal }) => (isLegal ? 'green' : 'red')};
`;

export default ({ card, loading }) => {
  if (!card || loading) return <Skeleton active paragraph={null} />;
  const isLegal = card.isCommanderLegal;

  return (
    <StyledWrapper isLegal={isLegal}>
      {isLegal ? <CheckOutlined /> : <CloseOutlined />}
      <Typography.Text
        style={{ marginLeft: 8 }}
        type={isLegal ? undefined : 'danger'}
      >
        {isLegal ? 'Legal in commander' : 'Not legal in commander'}
      </Typography.Text>
    </StyledWrapper>
  );
};
