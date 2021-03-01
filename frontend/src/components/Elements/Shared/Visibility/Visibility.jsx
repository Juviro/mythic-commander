import React, { useContext } from 'react';
import { Button } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import { useToggle } from 'components/Hooks';
import UserContext from 'components/Provider/UserProvider';
import ChangeVisibilityModal from './ChangeVisibilityModal';

const StyledWrapper = styled.div`
  align-self: flex-end;
`;

export default (props) => {
  const [showModal, toggleShowModal] = useToggle();
  const { user } = useContext(UserContext);

  if (!user) return null;

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
      <ChangeVisibilityModal visibile={showModal} onClose={toggleShowModal} {...props} />
    </StyledWrapper>
  );
};
