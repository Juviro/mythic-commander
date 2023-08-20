import React from 'react';
import Flex from 'components/Elements/Shared/Flex';
import ImagePicker from './ImagePicker';

export default ({ currentSettings, onPickImg }) => {
  return (
    <Flex direction="column">
      <ImagePicker onPick={onPickImg} currentSelection={currentSettings.avatar} />
    </Flex>
  );
};
