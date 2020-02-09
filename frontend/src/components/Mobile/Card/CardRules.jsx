import React, { useEffect, useState } from 'react';
import { Skeleton, List, Modal } from 'antd';
import styled from 'styled-components';

const StyledRulesWrapper = styled.div`
  width: 100%;
  height: 46px;
  margin-top: 16px;
  margin-top: 16px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #40a9ff;
  ${({ showBorder }) => (showBorder ? 'border: 1px solid #40a9ff;' : '')}
`;

export default ({ card = {} }) => {
  const { rulings_uri, name } = card;
  const [rules, setRules] = useState(null);
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    setRules(null);
    if (!rulings_uri) return;
    fetch(rulings_uri)
      .then(response => response.json())
      .then(({ data }) => setRules(data));
  }, [rulings_uri]);

  return (
    <>
      <StyledRulesWrapper
        showBorder={Boolean(rules)}
        onClick={rules ? () => setIsOpen(true) : undefined}
      >
        {rules ? (
          'Show rules for this card'
        ) : (
          <Skeleton active paragraph={null} />
        )}
      </StyledRulesWrapper>
      <Modal footer={null} visible={isOpen} onCancel={() => setIsOpen(false)}>
        <List
          size="small"
          header={
            <span style={{ fontWeight: 600 }}>{`Rules for ${name}`}</span>
          }
          dataSource={rules}
          onClick={() => setIsOpen(false)}
          renderItem={({ comment }) => <List.Item>{comment}</List.Item>}
        />
      </Modal>
    </>
  );
};
