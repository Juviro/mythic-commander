import React from 'react';
import { Select, List } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { editDeck } from '../../../../../queries';

const StyledHeader = styled.span`
  margin-bottom: 8px;
`;

const byName = (a, b) => (a.name > b.name ? 1 : -1);

export default ({ deck }) => {
  const [editMutation] = useMutation(editDeck);
  const getImgSrc = card => card.id && (card.card_faces ? card.card_faces[0] : card).image_uris.art_crop;

  const currentImage = deck.cards.find(card => getImgSrc(card) === deck.imgSrc) || {};

  const onChangeImage = async imgSrc => {
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
        {deck.cards.sort(byName).map(card => (
          <Select.Option value={getImgSrc(card)} key={card.id}>
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </List.Item>
  );
};
