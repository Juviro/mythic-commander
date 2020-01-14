import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default ({ onChangeName, name }) => {
  return (
    <Paragraph
      ellipsis
      editable={{ onChange: val => onChangeName(val || 'My Deck') }}
      style={{ marginTop: 10, fontSize: 14 }}
    >
      {name}
    </Paragraph>
  );
};
