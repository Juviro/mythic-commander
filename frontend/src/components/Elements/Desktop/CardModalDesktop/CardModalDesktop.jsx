import React from 'react';
import { Modal } from 'antd';
import { useQuery } from 'react-apollo';
import CardDetailsDesktop from '../CardDetailsDesktop';

import { cardDetailsDesktop } from '../CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import useBlockShortcuts from '../../../Hooks/useBlockShortcuts';
import { useShortcut } from '../../../Hooks';

const CardModalDesktop = ({
  card,
  visible,
  onClose,
  loading: parentLoading,
}) => {
  // useBlockShortcuts(visible);
  useShortcut('ENTER', onClose, visible);
  const { data, loading: cardLoading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id: card.oracle_id },
  });
  const loading = cardLoading || parentLoading;

  const unifiedCard = data && unifySingleCard(data.cardByOracleId);

  const usedCard = { ...unifiedCard, ...card };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={1100}
      bodyStyle={{
        overflow: 'auto',
        maxHeight: 'calc(100vh - 32px)',
      }}
      style={{ maxWidth: '100%' }}
    >
      {card && <CardDetailsDesktop card={usedCard} loading={loading} />}
    </Modal>
  );
};

export default ({ card, ...props }) => {
  if (!card) return null;

  return <CardModalDesktop card={card} {...props} />;
};
