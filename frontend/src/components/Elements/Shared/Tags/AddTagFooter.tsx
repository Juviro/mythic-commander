import { Button, Dropdown, Menu } from 'antd';
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
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={onSaveAsDefault}>
                Save as default
              </Menu.Item>
            </Menu>
          }
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
