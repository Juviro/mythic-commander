import React from 'react';
import { useQuery } from '@apollo/client';
import { NavigationButton } from 'components/Elements/Desktop/CardModalDesktop/NavigationButton';
import Flex from 'components/Elements/Shared/Flex';
import FocusedModal from 'components/Elements/Shared/FocusedModal';
import CardDetailsDesktop from '../CardDetailsDesktop';

import { cardDetailsDesktop, cardDetailsById } from '../CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import { useShortcut } from '../../../Hooks';

const CardModalDesktop = ({
  selectedCard,
  onClose,
  loading: parentLoading,
  onNext = null,
  onPrevious = null,
}) => {
  useShortcut('SPACE', onClose, { focusId: 'modal.cardDetails' });
  const { oracle_id, id: initialCardId } = selectedCard;
  const { query, variables, dataKey } = oracle_id
    ? { query: cardDetailsDesktop, variables: { oracle_id }, dataKey: 'cardByOracleId' }
    : { query: cardDetailsById, variables: { id: initialCardId }, dataKey: 'card' };

  const { data, loading: cardLoading } = useQuery(query, {
    variables,
    fetchPolicy: 'network-only',
  });
  const loading = cardLoading || parentLoading;

  const unifiedCard = data?.[dataKey] && unifySingleCard(data[dataKey]);

  return (
    <FocusedModal
      visible
      centered
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={1200}
      styles={{
        body: {
          overflowY: 'scroll',
          maxHeight: 'calc(100vh - 128px)',
        },
      }}
      style={{ maxWidth: '100%' }}
      focusId="modal.cardDetails"
    >
      <Flex direction="row">
        {onPrevious && <NavigationButton type="previous" onClick={onPrevious} />}
        <Flex direction="column" style={{ padding: '0 16px' }}>
          <CardDetailsDesktop
            card={unifiedCard}
            loading={loading}
            parentLoading={parentLoading}
            fallbackCard={selectedCard}
            initialCardId={initialCardId}
          />
        </Flex>
        {onNext && <NavigationButton type="next" onClick={onNext} />}
      </Flex>
    </FocusedModal>
  );
};

export default ({ visible, selectedCard, ...props }) => {
  if (!visible) return null;

  return <CardModalDesktop {...props} selectedCard={selectedCard} />;
};
