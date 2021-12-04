import { Button, Space } from 'antd';
import FeatureFlag from 'components/Elements/Shared/FeatureFlag';
import Flex from 'components/Elements/Shared/Flex';
import { FEATURE_FLAG_TAG } from 'constants/featureFlags';
import React from 'react';

interface Props {
  onSave: () => void;
  onSaveAsDefault: () => void;
}

const AddTagFooter = ({ onSave, onSaveAsDefault }: Props) => {
  return (
    <Flex justify="flex-end">
      <Space>
        <FeatureFlag flag={FEATURE_FLAG_TAG}>
          <Button type="primary" ghost onClick={onSaveAsDefault}>
            Save as default
          </Button>
        </FeatureFlag>
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </Space>
    </Flex>
  );
};

export default AddTagFooter;
