import React from 'react';
import { Select, message } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { editDeck } from '../queries';
import { getImageUrl } from '../../../../utils/cardImage';

const StyledHeader = styled.span`
  margin-bottom: 8px;
  display: flex;
  align-self: flex-start;
`;

const byName = (a, b) => (a.name > b.name ? 1 : -1);

export default ({ deck }) => {
  const [mutate] = useMutation(editDeck);
  const getImgSrc = ({ id, imgKey }) => getImageUrl(id, imgKey, 'art_crop');

  const currentImage = deck.cards.find((card) => getImgSrc(card) === deck.imgSrc) || {};

  const onChangeImage = (imgSrc) => {
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
  };

  return (
    <>
      <StyledHeader>Deck Image:</StyledHeader>
      <Select
        defaultValue={getImgSrc(currentImage)}
        style={{ width: '100%' }}
        onSelect={onChangeImage}
      >
        {deck.cards.sort(byName).map((card) => (
          <Select.Option value={getImgSrc(card)} key={card.id}>
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
