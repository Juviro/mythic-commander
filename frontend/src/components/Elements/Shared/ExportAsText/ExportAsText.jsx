import React from 'react';
import { Input, Switch, Typography, Space, Button } from 'antd';
import styled from 'styled-components';
import { DownloadOutlined } from '@ant-design/icons';
import Flex from '../Flex';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import { useToggle } from '../../../Hooks';
import FocusedModal from '../FocusedModal';
import isMobile from '../../../../utils/isMobile';

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

export default ({ title, cards, visible, hideAmount }) => {
  const [exportViewOpen, toggleExportViewOpen] = useToggle(visible);
  const [showAmount, setShowAmount] = useLocalStorage('showAmount', true);
  const cardNameList = cards
    .map(
      ({ amount, name }) =>
        `${showAmount && !hideAmount ? `${amount} ` : ''}${name}`
    )
    .join('\n');

  const onDownloadAsText = () => downloadAsTxt(cardNameList, title);

  return (
    <>
      <Button type="link" onClick={toggleExportViewOpen}>
        Export as Text
      </Button>
      <FocusedModal
        title={title}
        footer={null}
        destroyOnClose
        visible={exportViewOpen}
        onCancel={toggleExportViewOpen}
        bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
        style={{ top: 20 }}
        focusId="modal.exportAsText"
      >
        <Flex
          justify="space-between"
          style={{ marginBottom: 16, fontSize: 16 }}
        >
          <Typography.Paragraph
            copyable={{ text: cardNameList }}
            style={{ marginBottom: 0 }}
          >
            Copy List
          </Typography.Paragraph>
          <Flex direction="column">
            {!hideAmount && (
              <Space style={{ marginBottom: 16 }}>
                <Switch
                  checked={showAmount}
                  onChange={() => setShowAmount(!showAmount)}
                />
                <Typography.Text>Show amount</Typography.Text>
              </Space>
            )}
            {!isMobile() && (
              <Button
                type="link"
                icon={<DownloadOutlined />}
                onClick={onDownloadAsText}
                style={{ marginBottom: 16, paddingLeft: 0, fontSize: 16 }}
              >
                Download as txt
              </Button>
            )}
          </Flex>
        </Flex>
        <StyledInputWrapper>
          <Input.TextArea
            readOnly
            onFocus={e => e.target.select()}
            value={cardNameList}
            autoSize={{ maxRows: 20 }}
          />
        </StyledInputWrapper>
      </FocusedModal>
    </>
  );
};
