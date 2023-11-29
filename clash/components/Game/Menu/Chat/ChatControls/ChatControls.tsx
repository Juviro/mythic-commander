import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';

export type MessageType = 'LOG' | 'CHAT';

interface Props {
  setEnabledTypes: (types: MessageType[]) => void;
  enabledTypes: MessageType[];
}

const ChatControls = ({ enabledTypes, setEnabledTypes }: Props) => {
  const onChange = (e: CheckboxChangeEvent) => {
    const { checked, name } = e.target;

    if (checked) {
      setEnabledTypes([...enabledTypes, name as MessageType]);
    } else {
      setEnabledTypes(enabledTypes.filter((type) => type !== name));
    }
  };

  return (
    <div>
      <Checkbox checked={enabledTypes.includes('CHAT')} onChange={onChange} name="CHAT">
        Chat
      </Checkbox>
      <Checkbox checked={enabledTypes.includes('LOG')} onChange={onChange} name="LOG">
        Game Log
      </Checkbox>
    </div>
  );
};

export default ChatControls;
