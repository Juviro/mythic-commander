import React from 'react';
import { useMutation } from '@apollo/client';
import EditableTitle from 'components/Elements/Shared/EditableTitle';
import { editWantsList } from './queries';

export default ({ wantsList, level, canEdit }) => {
  const [mutate] = useMutation(editWantsList);
  const onChangeName = (name) => {
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
    <EditableTitle
      level={level}
      canEdit={canEdit}
      name={wantsList && wantsList.name}
      onChange={onChangeName}
    />
  );
};
