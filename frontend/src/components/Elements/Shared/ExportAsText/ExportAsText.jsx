import React from 'react';
import { Input, Switch, Typography, Space, Button } from 'antd';
import styled from 'styled-components';
import Flex from '../Flex';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import { useToggle } from '../../../Hooks';
import FocussedModal from '../FocussedModal';

const StyledInputWrapper = styled.div`
  overflow: auto;
  height: calc(100%-48px);
`;

export default ({ title, cards }) => {
  const [exportViewOpen, toggleExportViewOpen] = useToggle();
  const [showAmount, setShowAmount] = useLocalStorage('showAmount', true);
  const cardNameList = cards
    .map(({ amount, name }) => `${showAmount ? `${amount} ` : ''} ${name}`)
    .join('\n');

  return (
    <>
      <FocussedModal
        title={title}
        footer={null}
        destroyOnClose
        visible={exportViewOpen}
        onCancel={toggleExportViewOpen}
        bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
        focusId="modal.exportAsText"
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16, fontSize: 16 }}
        >
          <Typography.Paragraph
            copyable={{ text: cardNameList }}
            style={{ marginBottom: 0 }}
          >
            Copy List
          </Typography.Paragraph>
          <Space>
            <Switch
              checked={showAmount}
              onChange={() => setShowAmount(!showAmount)}
            />
            <Typography.Text>Show amount</Typography.Text>
          </Space>
        </Flex>
        <StyledInputWrapper>
          <Input.TextArea
            readOnly
            onFocus={e => e.target.select()}
            value={cardNameList}
            autoSize={{ maxRows: 25 }}
          />
        </StyledInputWrapper>
      </FocussedModal>
      <Button type="link" onClick={toggleExportViewOpen}>
        Export as Text
      </Button>
    </>
  );
};
