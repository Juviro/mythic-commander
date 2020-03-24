import React from 'react';
import { useMutation } from 'react-apollo';
import { EditableTitle } from '../../../Elements';
import { editWantsList } from '../queries';

export default ({ wantsList }) => {
  const [mutate] = useMutation(editWantsList);
  const onChangeName = name => {
    mutate({
      variables: {
        wantsListId: wantsList.id,
        newProperties: {
          name,
        },
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        editWantsList: {
          ...wantsList,
          name,
        },
      }),
      refetchQueries: ['cardsByOracleId'],
    });
  };

  return (
    <EditableTitle name={wantsList && wantsList.name} onChange={onChangeName} />
  );
};
