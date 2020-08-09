import React from 'react';
import { Divider } from 'antd';
import { Flex } from '../../../../../../Elements/Shared';
import AvatarList from './AvatarList';
import { lifeTracker } from '../../../../../../../constants/colors';
import ImagePicker from './ImagePicker';

export default ({ currentSettings, onPickColor, onPickImg }) => {
  return (
    <Flex direction="column">
      <Divider>Pick your Background:</Divider>
      <AvatarList
        elements={lifeTracker}
        type="color"
        onClick={onPickColor}
        currentSelection={currentSettings.avatar}
      />
      <Divider>or</Divider>
      <ImagePicker onPick={onPickImg} />
    </Flex>
  );
};
