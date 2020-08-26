import React from 'react';
import { Alert } from 'antd';
import useLocalStorage from '../../../Hooks/useLocalStorage';

interface Props {
  id: string;
  showIcon?: boolean;
  type?: string;
  description?: string;
  message?: string;
  style?: React.CSSProperties;
}

export default ({ id, showIcon, type = 'info', description, message, style }: Props) => {
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
