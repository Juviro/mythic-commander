import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';
import { getCollection, deleteFromCollection } from '../../../queries';

const StyledCardPreview = styled.div`
  display: flex;
`;

const getOptions = (card, onDelete) => {
  return [
    {
      name: 'Delete',
      onClick: () =>
        onDelete({
          variables: { cardId: card.id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteFromCollection: card.id,
          },
          update: (cache, { data: { deleteFromCollection: cardId } }) => {
            const newData = cache.readQuery({ query: getCollection });
            const updatedData = newData.collection.filter(({ id }) => id !== cardId);
            cache.writeQuery({ query: getCollection, data: { collection: updatedData } });
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
