import React from 'react';
import { useMutation } from 'react-apollo';
import { EditableTitle } from '../../../Elements/Shared';
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
      refetchQueries: ['cardByOracleId'],
    });
  };

  return (
    <EditableTitle name={wantsList && wantsList.name} onChange={onChangeName} />
  );
};
