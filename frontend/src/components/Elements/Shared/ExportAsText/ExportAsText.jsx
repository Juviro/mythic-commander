import React from 'react';
import { Input, Switch, Typography, Space, Button } from 'antd';
import styled from 'styled-components';
import Flex from '../Flex';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import { useToggle } from '../../../Hooks';
import FocusedModal from '../FocusedModal';

const StyledInputWrapper = styled.div`
  overflow: auto;
  height: calc(100%-48px);
`;

const downloadAsTxt = (cardNameList, deckName) => {
  const element = document.createElement('a');
  const file = new Blob([cardNameList], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${deckName}.txt`;
  document.body.appendChild(element);
  element.click();
};

export default ({ title, cards }) => {
  const [exportViewOpen, toggleExportViewOpen] = useToggle();
  const [showAmount, setShowAmount] = useLocalStorage('showAmount', true);
  const cardNameList = cards
    .map(({ amount, name }) => `${showAmount ? `${amount} ` : ''}${name}`)
    .join('\n');

  const onDownloadAsText = () => downloadAsTxt(cardNameList, title);

  return (
    <>
      <FocusedModal
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
        <Button
          type="link"
          onClick={onDownloadAsText}
          style={{ marginTop: 16, paddingLeft: 0 }}
        >
          Download as txt
        </Button>
      </FocusedModal>
      <Button type="link" onClick={toggleExportViewOpen}>
        Export as Text
      </Button>
    </>
  );
};
