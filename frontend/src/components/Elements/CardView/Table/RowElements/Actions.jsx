import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useMutation } from 'react-apollo';
import { getCollection, deleteFromCollection } from '../../../../../queries';

const StyledCardPreview = styled.div`
  display: flex;
`;

const getOptionsByType = {
  deck: { mutation: deleteFromCollection, query: getCollection, mutationName: 'deleteFromCollection' },
  collection: { mutation: deleteFromCollection, query: getCollection, mutationName: 'deleteFromCollection' },
};

const getOptions = (type, card, onDelete) => {
  const { query, mutationName } = getOptionsByType[type];

  return [
    {
      name: 'Delete',
      onClick: () =>
        onDelete({
          variables: { cardId: card.id },
          optimisticResponse: {
            __typename: 'Mutation',
            [mutationName]: card.id,
          },
          update: (cache, { data: { [mutationName]: cardId } }) => {
            const newData = cache.readQuery({ query });
            const updatedData = newData[type].filter(({ id }) => id !== cardId);
            cache.writeQuery({ query, data: { [type]: updatedData } });
          },
        }),
    },
  ];
};

export default ({ card, type = 'collection' }) => {
  const [onDelete] = useMutation(getOptionsByType[type].mutation);
  const options = getOptions(type, card, onDelete);

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
