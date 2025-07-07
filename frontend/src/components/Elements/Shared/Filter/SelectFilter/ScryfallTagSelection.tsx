import React from 'react';
import { useQuery } from '@apollo/client';

import { Query } from 'types/graphql';
import MultiSelectFilter from './MultiSelectFilter';
import { scryfallTags } from './queries';

interface ScryfallTagSelectionProps {
  placeholder: string;
  onChange: (value: string[]) => void;
  value: string[];
  size: 'small' | 'middle' | 'large';
}

const ScryfallTagSelection = ({
  placeholder,
  onChange,
  value,
  size,
}: ScryfallTagSelectionProps) => {
  const { data } = useQuery<Query>(scryfallTags);
  const options = data?.scryfallTags.map(({ slug }) => slug);

  return (
    <MultiSelectFilter
      options={options}
      onChange={onChange}
      size={size}
      value={value}
      paramName="scryfallTags"
      placeholder={placeholder}
    />
  );
};

export default ScryfallTagSelection;
