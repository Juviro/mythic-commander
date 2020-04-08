import React, { useEffect, useState } from 'react';
import { Skeleton, List, Modal, Button, Typography } from 'antd';
import styled from 'styled-components';
import Linkify from 'react-linkify';

const StyledRulesWrapper = styled.div`
  width: 100%;
  height: 32px;
  margin: 12px 0 32px;
`;

export default ({ card = {}, loading }) => {
  const { id, name, oracle_id } = card;
  const [rules, setRules] = useState(null);
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchRules = async () => {
      setIsOpen(false);
      try {
        const rulingsUri = `https://api.scryfall.com/cards/${id}/rulings`;
        const response = await fetch(rulingsUri, {
          signal: abortController.signal,
        });
        const { data } = await response.json();
        setRules(data);
      } catch (e) {
        console.warn(e);
      }
    };

    setRules(null);
    if (id) fetchRules();

    return () => {
      abortController.abort();
    };

    // Don't refetch when set is changed
    // eslint-disable-next-line
  }, [oracle_id]);

  const hasRules = rules && rules.length;
  const buttonText = rules
    ? hasRules
      ? 'Show Rulings for this card'
      : 'No rules found'
    : null;

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={null} />
      ) : (
        <StyledRulesWrapper showBorder={Boolean(rules)} hasRules={hasRules}>
          <Button block onClick={() => setIsOpen(true)} disabled={!hasRules}>
            {buttonText}
          </Button>
        </StyledRulesWrapper>
      )}
      <Modal
        footer={null}
        visible={isOpen}
        onCancel={() => setIsOpen(false)}
        centered
      >
        <List
          size="small"
          header={
            <span style={{ fontWeight: 600 }}>{`Rules for ${name}`}</span>
          }
          dataSource={rules || []}
          onClick={() => setIsOpen(false)}
          renderItem={({ comment }) => (
            <List.Item>
              <Typography.Text style={{ width: '100%' }}>
                <Linkify>{comment}</Linkify>
              </Typography.Text>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
