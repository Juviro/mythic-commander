import React from 'react';
import { Alert } from 'antd';
import useLocalStorage from '../../../Hooks/useLocalStorage';

export default ({ id, showIcon, type = 'info', description, message, style }) => {
  const [isVisible, setIsVisible] = useLocalStorage(`oneTimeInfoBox.${id}`, true);

  if (!isVisible) return null;

  return (
    <Alert
      style={style}
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      closable
      onClose={() => setIsVisible(false)}
    />
  );
};