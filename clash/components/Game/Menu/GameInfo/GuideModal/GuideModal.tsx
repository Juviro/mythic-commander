import React, { useState } from 'react';
import { Modal, Tabs } from 'antd';

import { BookOutlined, ReadOutlined, SettingOutlined } from '@ant-design/icons';
import GuideShortcuts from './GuideShortcuts';

import styles from './GuideModal.module.css';
import GuideCommands from './GuideCommands';
import Settings from './Settings/Settings';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GuideModal = ({ open, onClose }: Props) => {
  const [currentTab, setCurrentTab] = useState('settings');

  const items = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      children: <Settings />,
    },
    {
      key: 'shortcuts',
      label: 'Shortcuts',
      icon: <BookOutlined />,
      children: <GuideShortcuts />,
    },
    {
      key: 'commands',
      label: 'Commands',
      icon: <ReadOutlined />,
      children: <GuideCommands />,
    },
  ];

  const title = items.find((item) => item.key === currentTab)?.label;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title={title}
      width={800}
      styles={{
        body: {
          height: 600,
        },
      }}
      footer={null}
    >
      <Tabs
        items={items}
        tabPlacement="start"
        className={styles.tabs}
        onChange={setCurrentTab}
      />
    </Modal>
  );
};

export default GuideModal;
