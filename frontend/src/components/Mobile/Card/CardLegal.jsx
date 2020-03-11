import React from 'react';
import styled from 'styled-components';
import { Skeleton, Typography, Icon } from 'antd';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: ${({ isLegal }) => (isLegal ? 'green' : 'red')};
`;

export default ({ card }) => {
  if (!card) return <Skeleton active paragraph={null} />;
  const isLegal = card.legalities.commander === 'legal';
  return (
    <StyledWrapper isLegal={isLegal}>
      <Icon type={isLegal ? 'check' : 'close'} />
      <Typography.Text
        style={{ marginLeft: 8 }}
        type={isLegal ? undefined : 'danger'}
      >
        {isLegal ? 'Legal in commander' : 'Not legal in commander'}
      </Typography.Text>
    </StyledWrapper>
  );
};
