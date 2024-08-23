import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MutationSendFriendRequestArgs } from 'types/graphql';
import { success } from 'constants/colors';
import { sendFriendRequest } from './queries';

const StyledButton = styled(Button)`
  margin-left: 16px;
`;

const StyledSuccessIcon = styled(CheckOutlined)`
  color: ${success};
  margin-left: 16px;
`;

const StyledText = styled(Typography.Text)`
  font-weight: 400;
  margin-left: 8px;
`;

interface Props {
  userId: string;
}

const SendFriendRequestButton = ({ userId }: Props) => {
  const [mutate, { called, loading }] = useMutation<null, MutationSendFriendRequestArgs>(
    sendFriendRequest,
    {
      variables: {
        userId,
      },
    }
  );

  if (called) {
    return (
      <span>
        <StyledSuccessIcon />
        <StyledText>Request sent</StyledText>
      </span>
    );
  }

  return (
    <StyledButton
      onClick={() => mutate()}
      type="primary"
      size="small"
      loading={loading}
      icon={<PlusOutlined />}
    >
      Add friend
    </StyledButton>
  );
};

export default SendFriendRequestButton;
