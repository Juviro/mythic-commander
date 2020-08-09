import React from 'react';
import styled from 'styled-components';

import { Flex } from '../../../../../../Elements/Shared';
import Avatar from '../Avatar';

const StyledAvatarWrapper = styled.div`
  height: 50px;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({ elements, type = 'color', onClick, currentSelection }) => {
  return (
    <Flex direction="row" wrap="wrap">
      {elements.map(element => (
        <StyledAvatarWrapper key={element}>
          <Avatar
            {...{ [type]: element }}
            isSelected={currentSelection === element}
            onClick={() => onClick(element)}
          />
        </StyledAvatarWrapper>
      ))}
    </Flex>
  );
};
