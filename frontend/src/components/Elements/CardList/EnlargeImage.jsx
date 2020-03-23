import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import FullscreenCardModal from '../FullscreenCardModal/FullscreenCardModal';

const StyledAddButton = styled(PlusOutlined)`
  position: absolute;
  font-size: 50px;
  color: white;
  opacity: 0.5;
  top: 10%;
  right: 10%;
`;

export default ({ card }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onChangeIsOpen = e => {
    e.stopPropagation();
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <>
      <StyledAddButton onClick={onChangeIsOpen} />
      <FullscreenCardModal
        visible={isPreviewOpen}
        card={card}
        onChangeIsOpen={onChangeIsOpen}
      />
    </>
  );
};
