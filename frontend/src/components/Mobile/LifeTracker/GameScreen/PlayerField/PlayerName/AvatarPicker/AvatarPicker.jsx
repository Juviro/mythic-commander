import React from 'react';
import { Divider } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import AvatarList from './AvatarList';
import { lifeTracker } from '../../../../../../../constants/colors';
import ImagePicker from './ImagePicker';

export default ({ currentSettings, onPickColor, onPickImg }) => {
  return (
    <Flex direction="column">
      <Divider>Pick a Background Color</Divider>
      <AvatarList
        elements={lifeTracker}
        type="color"
        onClick={onPickColor}
        currentSelection={currentSettings.avatar}
      />
      <Divider>or</Divider>
      <ImagePicker onPick={onPickImg} currentSelection={currentSettings.avatar} />
    </Flex>
  );
};
