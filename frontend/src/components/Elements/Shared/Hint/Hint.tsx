import React, { useState } from 'react';
import { Tooltip, Modal } from 'antd';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';

import { primary } from 'constants/colors';

const StyledIcon = styled(InfoCircleOutlined)`
  margin-left: 6px;
  font-size: 16px;
  cursor: help !important;
  color: ${primary};
`;

interface Props {
  text?: React.ReactNode;
  asModal?: boolean;
  modalTitle?: string;
}

const Hint = ({ text, asModal, modalTitle }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!text) return null;

  const handleClick = () => {
    if (asModal) {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <Tooltip title={text} open={asModal ? false : undefined}>
        <StyledIcon onClick={handleClick} />
      </Tooltip>
      {asModal && (
        <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          centered
          title={modalTitle}
        >
          {text}
        </Modal>
      )}
    </>
  );
};

export default Hint;
