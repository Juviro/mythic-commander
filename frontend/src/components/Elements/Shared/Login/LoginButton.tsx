import { Button, Modal } from 'antd';
import { Login } from 'components/Elements/Shared';
import { useToggle } from 'components/Hooks';
import React from 'react';

export default () => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <Button onClick={toggleIsOpen} type="primary" style={{ minWidth: 160 }}>
        Login
      </Button>
      {/* z index of mobile drawer is 1002, make sure this is above it */}
      <Modal
        visible={isOpen}
        onCancel={toggleIsOpen}
        title="Login"
        footer={null}
        zIndex={1003}
      >
        <Login />
      </Modal>
    </>
  );
};
