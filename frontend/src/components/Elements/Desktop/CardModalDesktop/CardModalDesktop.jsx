import React from 'react';
import { useQuery } from 'react-apollo';
import CardDetailsDesktop from '../CardDetailsDesktop';

import { cardDetailsDesktop } from '../CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import { useShortcut } from '../../../Hooks';
import { FocussedModal } from '../../Shared';

const CardModalDesktop = ({
  card,
  visible,
  onClose,
  loading: parentLoading,
}) => {
  useShortcut('SPACE', visible ? onClose : null, 'modal.cardDetails');
  const { data, loading: cardLoading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id: card.oracle_id },
    fetchPolicy: 'network-only',
  });
  const loading = cardLoading || parentLoading;

  const unifiedCard = data && unifySingleCard(data.cardByOracleId);

  const usedCard = { ...unifiedCard, ...card };

  return (
    <FocussedModal
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
      focusId="modal.cardDetails"
    >
      {card && <CardDetailsDesktop card={usedCard} loading={loading} />}
    </FocussedModal>
  );
};

export default ({ card, ...props }) => {
  if (!card) return null;

  return <CardModalDesktop card={card} {...props} />;
};
