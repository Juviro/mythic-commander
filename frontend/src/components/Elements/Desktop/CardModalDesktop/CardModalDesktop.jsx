import React from 'react';
import { useQuery } from 'react-apollo';
import CardDetailsDesktop from '../CardDetailsDesktop';

import { cardDetailsDesktop } from '../CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import { useShortcut } from '../../../Hooks';
import { FocusedModal } from '../../Shared';

const CardModalDesktop = ({ selectedCard, onClose, loading: parentLoading }) => {
  const { oracle_id, id: initialCardId } = selectedCard;
  useShortcut('SPACE', onClose, 'modal.cardDetails');
  const { data, loading: cardLoading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id },
    fetchPolicy: 'network-only',
  });
  const loading = cardLoading || parentLoading;

  const unifiedCard = data && unifySingleCard(data.cardByOracleId);

  return (
    <FocusedModal
      centered
      visible
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={1100}
      bodyStyle={{
        overflow: 'auto',
        maxHeight: 'calc(100vh - 128px)',
      }}
      style={{ maxWidth: '100%' }}
      focusId="modal.cardDetails"
    >
      <CardDetailsDesktop
        card={unifiedCard}
        loading={loading}
        initialCardId={initialCardId}
      />
    </FocusedModal>
  );
};

export default ({ visible, selectedCard, ...props }) => {
  if (!visible || !selectedCard) return null;

  return <CardModalDesktop {...props} selectedCard={selectedCard} />;
};
