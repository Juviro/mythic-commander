import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import FullscreenCardModal from '../FullscreenCardModal/FullscreenCardModal';
import CardButton from '../../Shared/CardButton';

export default ({ card }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onChangeIsOpen = e => {
    e.stopPropagation();
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <>
      <CardButton index={2} onClick={onChangeIsOpen} Icon={EyeOutlined} />
      <FullscreenCardModal
        visible={isPreviewOpen}
        card={card}
        onChangeIsOpen={onChangeIsOpen}
      />
    </>
  );
};
