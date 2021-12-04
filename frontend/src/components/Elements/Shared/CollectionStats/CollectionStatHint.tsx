import React from 'react';
import Flex from '../Flex';
import Hint from '../Hint';

interface Props {
  title: string;
  hint: React.ReactNode;
}

const CollectionStatHint = ({ hint, title }: Props) => {
  return (
    <Flex align="center">
      <span>{title}</span>
      <Hint text={hint} />
    </Flex>
  );
};

export default CollectionStatHint;
