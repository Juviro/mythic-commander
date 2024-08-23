import React from 'react';
import { Modal, Tabs } from 'antd';

import GuideShortcuts from './GuideShortcuts';

import styles from './GuideModal.module.css';
import GuideCommands from './GuideCommands';

interface Props {
  open: boolean;
  onClose: () => void;
}

const GuideModal = ({ open, onClose }: Props) => {
  const items = [
    {
      key: 'shortcuts',
      label: 'Shortcuts',
      children: <GuideShortcuts />,
    },
    {
      key: 'commands',
      label: 'Commands',
      children: <GuideCommands />,
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title="Guide"
      width={800}
      styles={{
        body: {
          height: 600,
        },
      }}
      footer={null}
    >
      <Tabs items={items} tabPosition="left" className={styles.tabs} />
    </Modal>
  );
};

export default GuideModal;
