import React, { useContext } from 'react';
import { Empty, List, Modal } from 'antd';

import CardPositionContext from 'components/Game/CardPositionContext';
import useCardRules from './useCardRules';

const CardRules = () => {
  const { rulesCardId, setRulesCardId } = useContext(CardPositionContext);

  const { card, isLoading, rules } = useCardRules(rulesCardId);

  return (
    <Modal
      title={`Rules for ${card?.name}`}
      open={Boolean(card)}
      onCancel={() => setRulesCardId(null)}
      footer={null}
      styles={{
        body: {
          maxHeight: 'calc(100vh - 300px)',
          overflow: 'auto',
        },
      }}
      centered
      loading={isLoading}
    >
      {rules?.length ? (
        <List
          size="small"
          dataSource={rules ?? []}
          renderItem={(rule) => (
            <List.Item>
              <span>{rule}</span>
            </List.Item>
          )}
        />
      ) : (
        <Empty description="This card does not have any rules info" />
      )}
    </Modal>
  );
};

export default CardRules;
