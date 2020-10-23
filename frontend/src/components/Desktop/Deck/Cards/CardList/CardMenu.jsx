import React from 'react';
import { Typography, Tooltip, Space } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { primary, error } from 'constants/colors';
import keySymbols from 'constants/keySymbols';
import OwnedBadge from 'components/Elements/Shared/OwnedBadge/index';
import { getPriceLabel } from 'utils/cardStats';
import { Flex, EditCardModal, UnownedBadge } from 'components/Elements/Shared';
import { useToggle, useShortcut } from 'components/Hooks';
import { editDeckCardDesktop, getDeckDesktop } from '../../queries';

export default ({ card, onOpenDetails, onDelete }) => {
  const { id: deckId } = useParams();
  const value = getPriceLabel(card.minPrice);
  const [isEditing, toggleIsEditing] = useToggle();
  const [mutateEdit] = useMutation(editDeckCardDesktop);
  useShortcut('e', toggleIsEditing, 'deck.cards');

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { deckId, newProps, cardId },
      update: (cache, { data: { editDeckCard: newCard } }) => {
        const existing = cache.readQuery({
          query: getDeckDesktop,
          variables: { id: deckId },
        });

        const newCards = existing.deck.cards.map((deckCard) => {
          if (deckCard.card.id !== cardId) return deckCard;
          return newCard;
        });

        cache.writeQuery({
          query: getDeckDesktop,
          data: {
            deck: {
              ...existing.deck,
              cards: newCards,
            },
          },
        });
      },
    });
  };

  return (
    <>
      <Flex direction="column" style={{ marginTop: 4, padding: '0 8px' }}>
        <Flex justify="space-between">
          {card.owned ? <OwnedBadge marginLeft={0} /> : <UnownedBadge marginLeft={0} />}
          <Typography.Text strong>{value}</Typography.Text>
        </Flex>
        <Flex justify="space-between" style={{ marginTop: 4, fontSize: 18 }}>
          <Space size={8}>
            <Tooltip title={`Details [${keySymbols.SPACE}]`}>
              <InfoCircleOutlined onClick={onOpenDetails} style={{ color: primary }} />
            </Tooltip>
            <Tooltip title="Edit [E]">
              <EditOutlined onClick={toggleIsEditing} style={{ color: primary }} />
            </Tooltip>
          </Space>
          <Space>
            <Tooltip title={`Delete [${keySymbols.BACKSPACE}]`}>
              <DeleteOutlined onClick={onDelete} style={{ color: error }} />
            </Tooltip>
          </Space>
        </Flex>
      </Flex>
      {isEditing && (
        <EditCardModal card={card} onCancel={toggleIsEditing} onEdit={onEditCard} />
      )}
    </>
  );
};
