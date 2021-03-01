import React, { useContext } from 'react';
import { Button, Typography } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import { useToggle } from 'components/Hooks';
import UserContext from 'components/Provider/UserProvider';
import ChangeVisibilityModal from './ChangeVisibilityModal';

const StyledWrapper = styled.div`
  align-self: flex-end;
`;

const StyledLabel = styled(Typography.Text)`
  margin-left: 8px;
`;

export default ({ asListItem, callback, ...props }) => {
  const [showModal, toggleShowModal] = useToggle();
  const { user } = useContext(UserContext);

  if (!user) return null;

  const triggerElement = asListItem ? (
    <div
      onClick={() => {
        toggleShowModal();
        if (callback) callback();
      }}
    >
      <ShareAltOutlined />
      <StyledLabel>Share</StyledLabel>
    </div>
  ) : (
    <Button
      ghost
      type="primary"
      icon={<ShareAltOutlined />}
      onClick={toggleShowModal}
      style={{ alignSelf: 'flex-end' }}
    >
      Share
    </Button>
  );

  return (
    <StyledWrapper>
      {triggerElement}
      <ChangeVisibilityModal visibile={showModal} onClose={toggleShowModal} {...props} />
    </StyledWrapper>
  );
};
