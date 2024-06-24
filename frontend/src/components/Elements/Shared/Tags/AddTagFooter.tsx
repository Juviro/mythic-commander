import { Button, Dropdown } from 'antd';
import { FEATURE_FLAG_TAG } from 'constants/featureFlags';
import React, { useContext } from 'react';
import UserContext from 'components/Provider/UserProvider';
import Flex from '../Flex';

interface Props {
  onSave: () => void;
  onClose: () => void;
  onSaveAsDefault?: () => void;
}

const AddTagFooter = ({ onSave, onSaveAsDefault, onClose }: Props) => {
  const { hasFeatureFlag } = useContext(UserContext);

  const menu = {
    items: [
      {
        key: '1',
        onClick: onSaveAsDefault,
        title: 'Save as default',
      },
    ],
  };

  return (
    <Flex justify="space-between">
      <Button type="primary" ghost danger onClick={onClose} size="small">
        Cancel
      </Button>
      {onSaveAsDefault && hasFeatureFlag(FEATURE_FLAG_TAG) ? (
        <Dropdown.Button
          type="primary"
          onClick={onSave}
          size="small"
          style={{ marginLeft: 8 }}
          menu={menu}
        >
          Save
        </Dropdown.Button>
      ) : (
        <Button type="primary" onClick={onSave} size="small">
          Save
        </Button>
      )}
    </Flex>
  );
};

export default AddTagFooter;
