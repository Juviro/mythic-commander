import React, { useContext, useState } from 'react';
import { Modal, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { pick } from 'lodash';
import Flex from 'components/Elements/Shared/Flex';
import Expander from 'components/Elements/Shared/Expander';
import { useToggle } from '../../../../../Hooks';
import FullscreenModalContext from '../../../../../Provider/FullscreenModalProvider';
import Avatar from './Avatar';
import AvatarPicker from './AvatarPicker';
import useSubmitOnEnter from '../../../../../Hooks/useSubmitOnEnter';
import { updateLtPlayer } from './queries';
import PreviousPlayers from './PreviousPlayers';

const getInitialState = (player) => {
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

  const onSubmit = (settings) => {
    onUpdatePlayer(player.id, settings);

    const isDefaultName = currentSettings.name.match(/^Player\s\d/);
    if (!isDefaultName) {
      mutate({ variables: settings, refetchQueries: ['ltPlayers'] });
    }
    onClose();
  };

  const onOk = () => {
    const newSettings = {
      name: currentSettings.name || 'Player',
      img: null,
      color: null,
      [currentSettings.avatarType]: currentSettings.avatar,
    };
    onSubmit(newSettings);
  };

  const onSelectPlayer = (selectedPlayer) => {
    onSubmit(pick(selectedPlayer, ['name', 'img', 'color']));
  };

  const onChangeName = (e) => {
    setCurrentSettings({
      ...currentSettings,
      name: e.target.value,
    });
  };

  const onChangeAvatar = (type) => (newValue) => {
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
      visible
      onCancel={onClose}
      onOk={onOk}
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
            onFocus={(e) => e.target.select()}
            onSubmit={onOk}
            onKeyDown={useSubmitOnEnter(onOk)}
            onChange={onChangeName}
          />
        </Flex>
        <Expander isExpanded={isExpanded}>
          <AvatarPicker
            currentSettings={currentSettings}
            onPickImg={onChangeAvatar('img')}
          />
        </Expander>
        {!isExpanded && <PreviousPlayers onSelectPlayer={onSelectPlayer} />}
      </Flex>
    </Modal>
  );
};
