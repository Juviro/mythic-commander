import { Button, Space } from 'antd';
import { FEATURE_FLAG_TAG } from 'constants/featureFlags';
import React from 'react';
import Flex from '../Flex';
import FeatureFlag from '../FeatureFlag';

interface Props {
  onSave: () => void;
  onSaveAsDefault?: () => void;
}

const AddTagFooter = ({ onSave, onSaveAsDefault }: Props) => {
  return (
    <Flex justify="flex-end">
      <Space>
        {onSaveAsDefault && (
          <FeatureFlag flag={FEATURE_FLAG_TAG}>
            <Button type="primary" ghost onClick={onSaveAsDefault}>
              Save as default
            </Button>
          </FeatureFlag>
        )}
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </Space>
    </Flex>
  );
};

export default AddTagFooter;
