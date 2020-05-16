import React from 'react';
import { Button } from 'antd';

import Flex from '../Flex';
import FocussedModal from '../FocussedModal';

export default ({ onCancel, url, isVisible }) => {
  return (
    <FocussedModal
      footer={null}
      onCancel={onCancel}
      visible={isVisible}
      title="Proxy cards"
      focusId="modal.exportAsText"
    >
      <Flex direction="row" justify="space-around">
        <a target="_blank" rel="noopener noreferrer" href={url}>
          <Button
            style={{ width: 150 }}
            type="primary"
            ghost
            onClick={onCancel}
          >
            All Cards
          </Button>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${url}?filter=unowned-only`}
        >
          <Button style={{ width: 150 }} type="primary" onClick={onCancel}>
            Unowned Cards
          </Button>
        </a>
      </Flex>
    </FocussedModal>
  );
};
