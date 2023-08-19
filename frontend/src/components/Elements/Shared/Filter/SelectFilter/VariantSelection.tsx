import React from 'react';
import { useQuery } from '@apollo/client';

import { Query } from 'types/graphql';
import MultiSelectFilter from './MultiSelectFilter';
import { cardVariants } from './queries';

const VariantSelection = ({ onChangeOption, value, size, onSearch }) => {
  const { data } = useQuery<Query>(cardVariants, {
    fetchPolicy: 'cache-first',
  });

  return (
    <MultiSelectFilter
      size={size}
      value={value}
      onSearch={onSearch}
      onChange={onChangeOption}
      options={data?.cardVariants}
      placeholder={'e.g. "Borderless"'}
    />
  );
};

export default VariantSelection;
