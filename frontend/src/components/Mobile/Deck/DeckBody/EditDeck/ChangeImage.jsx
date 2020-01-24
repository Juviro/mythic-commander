import React from 'react';
import { Select, List } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { editDeck } from '../../../../../queries';

const StyledHeader = styled.span`
  margin-bottom: 8px;
`;

export default ({ deck }) => {
  const [editMutation] = useMutation(editDeck);
  const getImgSrc = card => card && (card.card_faces ? card.card_faces[0] : card).image_uris.art_crop;

  const currentImage = deck.cards.find(card => getImgSrc(card) === deck.imgSrc) || {};
  console.log('TCL: currentImage', currentImage);

  const onChangeImage = async imgSrc => {
    console.log('TCL: imgSrc', imgSrc);
    editMutation({
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
    <List.Item style={{ padding: 16 }}>
      <StyledHeader>Deck Image:</StyledHeader>
      <Select defaultValue={getImgSrc(currentImage)} style={{ width: '100%' }} onSelect={onChangeImage}>
        {deck.cards.map(card => (
          <Select.Option value={getImgSrc(card)} key={card.id}>
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </List.Item>
  );
};
