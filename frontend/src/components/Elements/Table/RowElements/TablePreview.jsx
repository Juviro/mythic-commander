import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';

import DraggablePreview from '../../Card/Preview/DraggablePreview';

const StyledPreviewWrapper = styled.div`
  height: 22px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCommanderTag = styled.span`
  position: absolute;
  background: linear-gradient(45deg, rgb(118, 98, 55), rgb(230, 205, 140), rgb(118, 98, 55));
  font-size: 25px;
  margin-left: -35px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CommanderTag = () => {
  return (
    <Tooltip title="Commander">
      <StyledCommanderTag>&#x2605;</StyledCommanderTag>
    </Tooltip>
  );
};

export default ({ card }) => {
  const isCommander = card.zone === 'COMMANDER';

  return (
    <StyledPreviewWrapper>
      {isCommander && <CommanderTag />}
      <DraggablePreview card={card} size="small" />
    </StyledPreviewWrapper>
  );
};
