import React from 'react';
import { AutoComplete, Form, Tooltip } from 'antd';

import getDropdownAlign from 'utils/getDropdownAlign';
import useChatInputCommands from './useChatInputCommands';

import styles from './ChatInput.module.css';

const ChatInput = () => {
  const { options, onKeyDown, inputValue, onChange, onSelect, error } =
    useChatInputCommands();

  return (
    <Form>
      <Tooltip title={error} open={Boolean(error)} placement="bottom">
        <AutoComplete
          className={styles.input}
          dropdownAlign={getDropdownAlign(true)}
          placeholder={`Chat with players or add command with "/"`}
          value={inputValue}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          open
          defaultActiveFirstOption
          onChange={(value) => onChange(value)}
          options={options}
        />
      </Tooltip>
    </Form>
  );
};

export default ChatInput;
