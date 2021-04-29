import React from 'react';
import { useQuery } from 'react-apollo';
import { NavigationButton } from 'components/Elements/Desktop/CardModalDesktop/NavigationButton';
import CardDetailsDesktop from '../CardDetailsDesktop';

import { cardDetailsDesktop } from '../CardDetailsDesktop/queries';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import { useShortcut } from '../../../Hooks';
import { Flex, FocusedModal } from '../../Shared';

const CardModalDesktop = ({
  selectedCard,
  onClose,
  loading: parentLoading,
  onNext = null,
  onPrevious = null,
}) => {
  const { oracle_id, id: initialCardId } = selectedCard;
  useShortcut('SPACE', onClose, { focusId: 'modal.cardDetails' });
  const { data, loading: cardLoading } = useQuery(cardDetailsDesktop, {
    variables: { oracle_id },
    fetchPolicy: 'network-only',
  });
  const loading = cardLoading || parentLoading;

  const unifiedCard = data && unifySingleCard(data.cardByOracleId);

  return (
    <FocusedModal
      visible
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={1200}
      bodyStyle={{
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 128px)',
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
