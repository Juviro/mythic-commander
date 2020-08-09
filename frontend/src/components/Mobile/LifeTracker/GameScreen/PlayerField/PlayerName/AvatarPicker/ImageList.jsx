import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Flex from '../../../../../../Elements/Shared/Flex/index';
import AvatarList from './AvatarList';

export default ({ loading, onPick, images, currentSelection }) => {
  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ width: '100%', height: 100 }}>
        <LoadingOutlined />
      </Flex>
    );
  }

  return (
    <AvatarList
      type="img"
      style={{ marginTop: 16 }}
      currentSelection={currentSelection}
      elements={images}
      onClick={onPick}
    />
  );
};
