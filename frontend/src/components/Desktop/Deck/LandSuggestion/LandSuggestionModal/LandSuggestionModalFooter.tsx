import React, { useContext } from 'react';

import { Button, Space } from 'antd';

import LandSuggestionContext from '../LandSuggestionContext';

const LandSuggestionModalFooter = () => {
  const { setDisplaySetings, displaySetings, selectedCardIds, onSubmit, submitting } =
    useContext(LandSuggestionContext);

  if (displaySetings) return null;

  return (
    <Space>
      <Button onClick={() => setDisplaySetings(true)}>Back</Button>
      <Button
        onClick={onSubmit}
        type="primary"
        disabled={!selectedCardIds.length}
        loading={submitting}
      >
        Apply
      </Button>
    </Space>
  );
};

export default LandSuggestionModalFooter;
