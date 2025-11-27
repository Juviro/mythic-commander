import React, { useContext } from 'react';
import { Empty, Modal } from 'antd';

import CardPositionContext from 'components/Game/CardPositionContext';
import useCardRules from './useCardRules';

import styles from './CardRules.module.css';

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
        <ul className={styles.rules_list}>
          {rules?.map((rule) => (
            <li key={rule} className={styles.rule}>{rule}</li>
          ))}
        </ul>
      ) : (
        <Empty description="This card does not have any rules info" />
      )}
    </Modal>
  );
};

export default CardRules;
