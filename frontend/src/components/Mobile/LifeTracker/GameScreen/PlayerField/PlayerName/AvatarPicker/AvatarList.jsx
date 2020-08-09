import React from 'react';

import Avatar from '../Avatar';
import { Flex } from '../../../../../../Elements/Shared';

const ELEMENTS_PER_ROW = 4;

export default ({ style, elements, type = 'color', onClick, currentSelection }) => {
  const rows = elements.reduce((acc, val, index) => {
    const rowIndex = Math.floor(index / ELEMENTS_PER_ROW);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(val);

    return acc;
  }, []);

  if (rows[rows.length - 1].length !== ELEMENTS_PER_ROW) {
    const numberOfDummyElements = ELEMENTS_PER_ROW - rows[rows.length - 1].length;
    for (let i = 0; i < numberOfDummyElements; i++) {
      rows[rows.length - 1].push(null);
    }
  }

  return (
    <Flex direction="column" style={{ padding: 4, ...style }}>
      {rows.map(row => (
        <Flex justify="space-between" key={row.join(';')} style={{ height: 48 }}>
          {row.map(element => (
            <Avatar
              key={element || Math.random()}
              {...{ [type]: element }}
              isSelected={currentSelection === element}
              onClick={() => onClick(element)}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
