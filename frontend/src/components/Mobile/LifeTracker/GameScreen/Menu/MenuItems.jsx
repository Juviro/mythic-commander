import React from 'react';
import {
  CloseOutlined,
  UndoOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Confirm from 'components/Elements/Shared/Confirm';
import { useToggle } from '../../../../Hooks';
import { primary } from '../../../../../constants/colors';

const StyledMenuItem = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 3px solid black;
  background-color: ${primary}dd;
  padding: 8px;
  font-size: 32px;
  pointer-events: auto;
  transition: all 0.3s;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ index, isOpen }) => (isOpen ? (index + 1) * 130 : 0)}px;
  transform: scale(${({ isOpen }) => (isOpen ? 1 : 0.5)});

  &:active {
    transform: scale(0.9);
  }
`;

const MenuItem = ({ handle, isOpen, onCloseMenu, onRestartGame }) => {
  const [isRestarting, toggleIsRestarting] = useToggle(false);
  const history = useHistory();

  const onToggleFullscreen = () => {
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
    onCloseMenu();
  };

  const onRestart = () => {
    onRestartGame();
    onCloseMenu();
    toggleIsRestarting();
  };

  const onEnd = () => {
    history.push(`/m/life-tracker`);
  };

  const menuItems = [
    {
      icon: <CloseOutlined />,
      onClick: onEnd,
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

export default MenuItem;
