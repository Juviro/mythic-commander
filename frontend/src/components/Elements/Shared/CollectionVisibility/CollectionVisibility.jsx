import React from 'react';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import { useToggle } from 'components/Hooks';
import ChangeVisibilityModal from './ChangeVisibilityModal';

const StyledWrapper = styled.div`
  align-self: flex-end;
`;

export default () => {
  const [showModal, toggleShowModal] = useToggle();

  return (
    <StyledWrapper>
      <Button
        ghost
        type="primary"
        icon={<ShareAltOutlined />}
        onClick={toggleShowModal}
        style={{ alignSelf: 'flex-end' }}
      >
        Share
      </Button>
      <ChangeVisibilityModal visibile={showModal} onClose={toggleShowModal} />
    </StyledWrapper>
  );
};
