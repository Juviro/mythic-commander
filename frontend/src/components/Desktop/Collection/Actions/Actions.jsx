import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';
import { deleteFromCollection } from '../../../../queries';
import { getCollectionDesktop } from '../queries';

const StyledCardPreview = styled.div`
  display: flex;
`;

const getOptions = (card, onDelete) => {
  return [
    {
      name: 'Delete',
      onClick: () =>
        onDelete({
          variables: { cardIds: [card.id] },
          update: cache => {
            const existing = cache.readQuery({
              query: getCollectionDesktop,
            });

            const updatedCards = existing.collection.cards.filter(
              ({ id }) => id !== card.id
            );

            cache.writeQuery({
              query: getCollectionDesktop,
              data: {
                collection: { ...existing.collection, cards: updatedCards },
              },
            });
          },
        }),
    },
  ];
};

export default ({ card }) => {
  const [onDelete] = useMutation(deleteFromCollection);
  const options = getOptions(card, onDelete);

  return (
    <StyledCardPreview>
      {options.map(option => (
        <Button type="link" onClick={option.onClick} key={option.name}>
          {option.name}
        </Button>
      ))}
    </StyledCardPreview>
  );
};
