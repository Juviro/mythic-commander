import React from 'react';
import { Modal, Tabs } from 'antd';

import GuideShortcuts from './GuideShortcuts';

import styles from './GuideModal.module.css';

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
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      title="Guide"
      width={800}
      footer={null}
    >
      <Tabs items={items} tabPosition="left" className={styles.tabs} />
    </Modal>
  );
};

export default GuideModal;
