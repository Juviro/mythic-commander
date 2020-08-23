import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import FullscreenCardModal from '../FullscreenCardModal/FullscreenCardModal';
import CardButton from '../../Shared/CardButton';
import { useToggle } from '../../../Hooks';

export default ({ card }) => {
  const [isPreviewOpen, toggleIsPreviewOpen] = useToggle(false);

  const onChangeIsOpen = (e) => {
    e.stopPropagation();
    toggleIsPreviewOpen();
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
