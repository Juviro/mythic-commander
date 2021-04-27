import React from 'react';
import { ZoomInOutlined } from '@ant-design/icons';
import CardButton from 'components/Elements/Shared/CardButton';
import { FullscreenCardModal } from 'components/Elements/Mobile';
import { useToggle } from '../../../Hooks';

export default ({ card }) => {
  const [isPreviewOpen, toggleIsPreviewOpen] = useToggle(false);

  const onChangeIsOpen = (e) => {
    e.stopPropagation();
    toggleIsPreviewOpen();
  };

  return (
    <>
      <CardButton index={2} onClick={onChangeIsOpen} Icon={ZoomInOutlined} />
      <FullscreenCardModal
        visible={isPreviewOpen}
        card={card}
        onChangeIsOpen={onChangeIsOpen}
      />
    </>
  );
};
