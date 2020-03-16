import React from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const StyledIssuesBox = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const StyledIconWrapper = styled.div`
  color: orange;
  font-size: 16px;
  position: absolute;
  line-height: 36px;
  transition: all 0.2s;
  z-index: 9;
  right: ${({ isOpen }) => (isOpen ? '36px' : '16px')};
`;

export default ({ card, isOpen, isLegal }) => {
  const { isCommanderLegal } = card;

  const isLegalWarning = isLegal
    ? ''
    : isCommanderLegal
    ? `• The color identity of this card is not 
        a subset of the commander's color identiy.`
    : '• This card is not legal in commander.';

  const isOwnedWarning = card.owned ? '' : '• You do not own this card';

  const renderIssues = (
    <StyledIssuesBox>
      <span>{isLegalWarning}</span>
      <span>{isOwnedWarning}</span>
    </StyledIssuesBox>
  );

  return (
    <div onClick={e => e.stopPropagation()}>
      <Popover
        placement="bottomRight"
        title="There is a problem with this card:"
        content={renderIssues}
        trigger="click"
      >
        <StyledIconWrapper isOpen={isOpen}>
          <ExclamationCircleOutlined />
        </StyledIconWrapper>
      </Popover>
    </div>
  );
};
