import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ltPlayer } from './queries';

export default ({ onSelectPlayer }) => {
  const { data, loading } = useQuery(ltPlayer);
  console.log('data,loading  :', data, loading);

  return null;
};
