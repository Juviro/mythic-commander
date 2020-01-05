import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { getCollection, deleteFromCollection } from '../../../../queries';

const StyledCardPreview = styled.div`
  display: flex;
`;

export default ({ card }) => {
  const [onDelete] = useMutation(deleteFromCollection);

  const options = [
    {
      name: 'Delete',
      onClick: () =>
        onDelete({
          variables: { cardId: card.id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteFromCollection: card.id,
          },
          update: (cache, { data: { deleteFromCollection: deleteFromCollectionId } }) => {
            const newData = cache.readQuery({ query: getCollection });
            const collection = newData.collection.filter(({ id }) => id !== deleteFromCollectionId);
            cache.writeQuery({ query: getCollection, data: { collection } });
          },
        }),
    },
  ];

  return (
    <StyledCardPreview>
      {options.map(option => (
        <div key={option.name}>
          {/* TODO a11y */}
          {/* eslint-disable-next-line */}
          <a onClick={option.onClick}>{option.name}</a>
        </div>
      ))}
    </StyledCardPreview>
  );
};
