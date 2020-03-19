import React from 'react';

import Title from './Title';
import Stats from './Stats';

export default ({ wantsList }) => {
  return (
    <>
      <Title wantsList={wantsList} />
      <Stats wantsList={wantsList} />
    </>
  );
};
