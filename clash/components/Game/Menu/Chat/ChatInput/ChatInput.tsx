import React, { useState } from 'react';
import { Form, Input } from 'antd';
import useGameActions from 'components/Game/useGameActions';

const ChatInput = () => {
  const { onSendChatMessage } = useGameActions();
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    if (!message) return;
    setMessage('');
    onSendChatMessage(message);
  };

  return (
    <Form>
      <Input
        placeholder="Insult the other players..."
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onPressEnter={onSubmit}
        autoComplete="off"
      />
    </Form>
  );
};

export default ChatInput;
