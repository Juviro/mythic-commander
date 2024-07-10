import { Empty } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import CardGrid from 'components/Elements/Shared/CardGrid';
import React from 'react';
import { UnifiedDeckCard } from 'types/unifiedTypes';

interface Props {
  commanderChoices: UnifiedDeckCard[];
  onPickCommander: (cardId: string) => void;
  onCancel: () => void;
  visible: boolean;
  label: string;
}

export const CommanderPickerModal = ({
  commanderChoices,
  onPickCommander,
  onCancel,
  visible,
  label,
}: Props) => {
  return (
    <Modal title={label} open={visible} onCancel={onCancel} footer={null}>
      {commanderChoices.length ? (
        <CardGrid
          minimal
          cards={commanderChoices}
          onClickCard={(card) => onPickCommander(card.id)}
        />
      ) : (
        <Empty description="No possible commanders found in your deck" />
      )}
    </Modal>
  );
};
