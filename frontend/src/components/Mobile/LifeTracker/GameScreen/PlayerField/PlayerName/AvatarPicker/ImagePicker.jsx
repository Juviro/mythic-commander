import React from 'react';
import { useLazyQuery } from 'react-apollo';
import { Flex, CardSearch } from '../../../../../../Elements/Shared';

export default ({ onPickImg }) => {
  //   const [fetchImages, { data, loading }] = useLazyQuery(cardsBySet, {
  //     variables: {
  //       setKey,
  //     },
  //     fetchPolicy: 'cache-first',
  //   });

  const onSearchCard = ({ id }) => {
    console.log('id :', id);
  };

  return (
    <Flex>
      <CardSearch onSearch={onSearchCard} width="100%" />
    </Flex>
  );
};
