import { Button, Modal } from 'antd';
import { useToggle } from 'components/Hooks';
import React from 'react';
import Login from './Login';

export default () => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <Button onClick={toggleIsOpen} type="primary" style={{ minWidth: 160 }}>
        Login
      </Button>
      {/* z index of mobile drawer is 1002, make sure this is above it */}
      <Modal
        open={isOpen}
        onCancel={toggleIsOpen}
        title="Login"
        footer={null}
        zIndex={1003}
        styles={{
          body: { height: 200, display: 'flex', justifyContent: 'center' },
        }}
      >
        <Login />
      </Modal>
    </>
  );
};
