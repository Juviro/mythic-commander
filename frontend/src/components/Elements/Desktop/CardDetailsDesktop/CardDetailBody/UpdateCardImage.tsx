import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { CloudSyncOutlined } from '@ant-design/icons';

import { FEATURE_FLAG_UPDATE_CARDS } from '../../../../../constants/featureFlags';
import { MutationUpdateCardImagesArgs } from '../../../../../types/graphql';
import FeatureFlag from '../../../Shared/FeatureFlag';
import { updateCardImages } from '../queries';

const StyledButton = styled(Button)`
  margin: 8px 0 0 80px;
  max-width: 220px;
`;

interface Props {
  cardId: string;
}

const UpdateCardImage = ({ cardId }: Props) => {
  const [mutate, { loading }] = useMutation<null, MutationUpdateCardImagesArgs>(
    updateCardImages
  );

  const onClick = () => {
    mutate({ variables: { cardId } });
  };

  return (
    <FeatureFlag flag={FEATURE_FLAG_UPDATE_CARDS}>
      <StyledButton onClick={onClick} icon={<CloudSyncOutlined />} loading={loading}>
        Update Card Image
      </StyledButton>
    </FeatureFlag>
  );
};

export default UpdateCardImage;
