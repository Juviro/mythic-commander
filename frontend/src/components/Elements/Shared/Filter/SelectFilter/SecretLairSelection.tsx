import React from 'react';
import { useQuery } from '@apollo/client';

import { Query } from 'types/graphql';
import MultiSelectFilter from './MultiSelectFilter';
import { secretLairs } from './queries';

const SecretLairSelection = ({ onChangeOption, value, size, onSearch }) => {
  const { data } = useQuery<Query>(secretLairs, {
    fetchPolicy: 'cache-first',
  });

  const options = data?.secretLairs.map((secretLair) => ({
    name: secretLair.name,
    value: secretLair.id,
  }));

  return (
    <MultiSelectFilter
      size={size}
      value={value}
      onSearch={onSearch}
      onChange={onChangeOption}
      options={options}
      placeholder={'e.g. "Extra Life 2022"'}
    />
  );
};

export default SecretLairSelection;
