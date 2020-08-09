import React, { useContext, useState } from 'react';
import { Modal, Input } from 'antd';

import { useToggle } from '../../../../../Hooks';
import { Flex, Expander } from '../../../../../Elements/Shared';
import FullscreenModalContext from '../../../../../Provider/FullscreenModalProvider';
import Avatar from './Avatar';
import AvatarPicker from './AvatarPicker';

const getInitialState = player => {
  const avatarType = player.img ? 'img' : 'color';
  return {
    name: player.name,
    avatarType,
    avatar: player[avatarType],
  };
};

export default ({ player, onClose, visible, onUpdatePlayer }) => {
  // TODO: false
  const [isExpanded, toggleIsExpanded] = useToggle(true);
  const { getContainer } = useContext(FullscreenModalContext);
  const [currentSettings, setCurrentSettings] = useState(getInitialState(player));

  const onSubmit = () => {
    const newSettings = {
      name: currentSettings.name || 'Player',
      img: null,
      color: null,
      [currentSettings.avatarType]: currentSettings.avatar,
    };
    onUpdatePlayer(player.id, newSettings);
    onClose();
  };

  const onChangeName = e => {
    setCurrentSettings({
      ...currentSettings,
      name: e.target.value,
    });
  };

  const onChangeAvatar = type => newValue => {
    setCurrentSettings({
      ...currentSettings,
      avatar: newValue,
      avatarType: type,
    });
  };

  const avatarProps = {
    [currentSettings.avatarType]: currentSettings.avatar,
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      onOk={onSubmit}
      closable={false}
      getContainer={getContainer}
    >
      <Flex direction="column">
        <Flex direction="row">
          <Avatar
            {...avatarProps}
            style={{ marginRight: 8 }}
            onClick={toggleIsExpanded}
            height={36}
          />
          <Input
            value={currentSettings.name}
            // TODO: enable
            // onFocus={e => e.target.select()}
            onSubmit={onSubmit}
            onChange={onChangeName}
          />
        </Flex>
        <Expander isExpanded={isExpanded} c>
          <AvatarPicker
            currentSettings={currentSettings}
            onPickColor={onChangeAvatar('color')}
            onPickImg={onChangeAvatar('img')}
          />
        </Expander>
      </Flex>
    </Modal>
  );
};
