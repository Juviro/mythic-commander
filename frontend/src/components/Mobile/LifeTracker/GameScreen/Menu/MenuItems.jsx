import React from 'react';
import {
  CloseOutlined,
  UndoOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useToggle } from '../../../../Hooks';
import { Confirm } from '../../../../Elements/Shared';

const StyledMenuItem = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 3px solid black;
  background-color: grey;
  padding: 8px;
  font-size: 32px;
  pointer-events: auto;
  transition: margin 0.3s;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ index, isOpen }) => (isOpen ? (index + 1) * 130 : 0)}px;

  &:active {
    transform: scale(0.9);
  }
`;

const MenuItem = ({ handle, isOpen, onCloseMenu, history, onRestartGame }) => {
  const [isRestarting, toggleIsRestarting] = useToggle(false);

  const onToggleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
    onCloseMenu();
  };

  const onLeave = () => {
    history.goBack();
  };

  const onRestart = () => {
    onRestartGame();
    onCloseMenu();
    toggleIsRestarting();
  };

  const menuItems = [
    {
      icon: <CloseOutlined />,
      onClick: onLeave,
    },
    {
      icon: <UndoOutlined />,
      onClick: toggleIsRestarting,
    },
    {
      icon: handle.active ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
      onClick: onToggleFullscreen,
    },
  ];

  return (
    <>
      {menuItems.map(({ icon, onClick }, index) => (
        <StyledMenuItem isOpen={isOpen} index={index} key={index} onClick={onClick}>
          {icon}
        </StyledMenuItem>
      ))}
      <Confirm
        visible={isRestarting}
        onCancel={toggleIsRestarting}
        title="Restart game?"
        onOk={onRestart}
        okText="Restart Game"
      />
    </>
  );
};

export default withRouter(MenuItem);
