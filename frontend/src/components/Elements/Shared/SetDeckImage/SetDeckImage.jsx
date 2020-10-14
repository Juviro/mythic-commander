import React, { useState } from 'react';
import { Select, message } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { editDeckImage } from './queries';
import { getImageUrl } from '../../../../utils/cardImage';
import FocusedModal from '../FocusedModal';

const StyledPreview = styled.img`
  width: 40px;
  height: 30px;
  margin: 0 8px 4px 0;
`;

const byName = (a, b) => (a.name > b.name ? 1 : -1);

export default ({ deck, visible, onClose }) => {
  const [mutate] = useMutation(editDeckImage);

  const getImgSrc = ({ id, imgKey }) => getImageUrl(id, imgKey, 'art_crop');
  const currentImage = deck.cards.find((card) => getImgSrc(card) === deck.imgSrc) || {};

  const [selectedCard, setSelectedCard] = useState(currentImage);

  const onSelectImage = (cardId) => {
    setSelectedCard(deck.cards.find(({ id }) => id === cardId));
  };

  const onChangeImage = () => {
    if (!selectedCard) {
      onClose();
      return;
    }

    const imgSrc = getImgSrc(selectedCard);
    message.success('Title image changed!');
    mutate({
      variables: {
        deckId: deck.id,
        newProperties: {
          imgSrc,
        },
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        editDeck: {
          ...deck,
          imgSrc,
        },
      }),
    });
    onClose();
  };

  return (
    <FocusedModal
      centered
      title="Select your title image"
      visible={visible}
      onCancel={onClose}
      destroyOnClose
      okText="Set image"
      onOk={onChangeImage}
      focusId="modal.setDeckImage"
    >
      <Select
        defaultValue={currentImage.id}
        style={{ width: '100%' }}
        onSelect={onSelectImage}
        size="large"
      >
        {deck.cards.sort(byName).map((card) => (
          <Select.Option value={card.id} key={card.id}>
            <StyledPreview src={getImgSrc(card)} />
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </FocusedModal>
  );
};
