import React from 'react';
import { Button, Form, InputNumber, Switch } from 'antd';
import styled from 'styled-components';

import { LandsSuggestionSettings } from '../landSuggestions.types';

const StyledForm = styled(Form)`
  margin-top: 16px;
  text-align: right;

  .ant-col {
    text-align: left;
  }

  .ant-input-number {
    width: 100%;
  }
`;

interface LandSuggestionSettingsProps {
  settings: LandsSuggestionSettings;
  setSettings: (settings: LandsSuggestionSettings) => void;
}

const LandSuggestionSettings = ({
  settings,
  setSettings,
}: LandSuggestionSettingsProps) => {
  return (
    <StyledForm
      labelCol={{ span: 16 }}
      wrapperCol={{ span: 8 }}
      initialValues={settings}
      onFinish={setSettings}
    >
      <Form.Item label="Total number of lands" name="numberOfLands">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Min number of basics per color" name="minNumberOfBasics">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Only suggest owned lands" name="ownedLandsOnly">
        <Switch />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    </StyledForm>
  );
};

export default LandSuggestionSettings;
