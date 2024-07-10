import React from 'react';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { CloudSyncOutlined } from '@ant-design/icons';

import { FEATURE_FLAG_UPDATE_CARDS } from '../../../../../constants/featureFlags';
import { MutationUpdateCardImagesArgs } from '../../../../../types/graphql';
import FeatureFlag from '../../../Shared/FeatureFlag';
import { updateCardImages } from '../queries';

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
      <Button onClick={onClick} icon={<CloudSyncOutlined />} loading={loading}>
        Update Card Image
      </Button>
    </FeatureFlag>
  );
};

export default UpdateCardImage;
