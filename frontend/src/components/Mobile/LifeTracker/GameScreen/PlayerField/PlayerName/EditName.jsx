import React, { useContext, useState } from 'react';
import { Modal, Input } from 'antd';

import { useMutation } from '@apollo/react-hooks';
import { pick } from 'lodash';
import { useToggle } from '../../../../../Hooks';
import { Flex, Expander } from '../../../../../Elements/Shared';
import FullscreenModalContext from '../../../../../Provider/FullscreenModalProvider';
import Avatar from './Avatar';
import AvatarPicker from './AvatarPicker';
import useSubmitOnEnter from '../../../../../Hooks/useSubmitOnEnter';
import { updateLtPlayer } from './queries';
import PreviousPlayers from './PreviousPlayers';

const getInitialState = player => {
  const avatarType = player.img ? 'img' : 'color';
  return {
    name: player.name,
    avatarType,
    avatar: player[avatarType],
  };
};

export default ({ player, onClose, onUpdatePlayer }) => {
  const [isExpanded, toggleIsExpanded] = useToggle();
  const { getContainer } = useContext(FullscreenModalContext);
  const [currentSettings, setCurrentSettings] = useState(getInitialState(player));
  const [mutate] = useMutation(updateLtPlayer);

  const onSubmit = () => {
    const newSettings = {
      name: currentSettings.name || 'Player',
      img: null,
      color: null,
      [currentSettings.avatarType]: currentSettings.avatar,
    };
    onUpdatePlayer(player.id, newSettings);

    const isDefaultName = currentSettings.name.match(/^Player\s\d/);
    if (!isDefaultName) {
      mutate({ variables: newSettings });
    }
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

  const onSelectPlayer = selectedPlayer => {
    onUpdatePlayer(player.id, selectedPlayer);
    const isDefaultName = selectedPlayer.name.match(/^Player\s\d/);
    if (!isDefaultName) {
      mutate({ variables: pick(selectedPlayer, ['name', 'img', 'color']) });
    }
    onClose();
  };

  const avatarProps = {
    [currentSettings.avatarType]: currentSettings.avatar,
  };

  return (
    <Modal
      visible
      onCancel={onClose}
      onOk={onSubmit}
      closable={false}
      destroyOnClose
      style={{ top: 0 }}
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
            onFocus={e => e.target.select()}
            onSubmit={onSubmit}
            onKeyDown={useSubmitOnEnter(onSubmit)}
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
        <PreviousPlayers onSelectPlayer={onSelectPlayer} />
      </Flex>
    </Modal>
  );
};
