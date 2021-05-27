import React from 'react';
import { Button, Divider, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { Flex } from 'components/Elements/Shared';
import { UnifiedDeck } from 'types/unifiedTypes';
import { useToggle } from 'components/Hooks';
import { DeckBreakdownBody } from './DeckbreakdownBody/DeckBreakdownBody';
import { DeckBreakdownHeader } from './DeckBreakdownHeader/DeckBreakdownHeader';

const StyledWrapper = styled.aside<{ isOpen: boolean }>`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-left: 24px;
  background-color: white;
  height: fit-content;
  transition: transform 0.3s;
  box-shadow: 0px 0px 10px 4px #9c9c9c;

  ${({ isOpen }) =>
    isOpen
      ? css``
      : css`
          transform: translateY(-64px);
          position: absolute;
          right: 24px;
        `}

  @media (min-width: 1200px) {
    min-width: 600px;
  }

  @media (min-width: 2000px) {
    margin-right: -80px;
    margin-left: 48px;
  }

  @media (min-width: 2200px) {
    margin-right: -200px;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 50%;
`;

interface Props {
  deck?: UnifiedDeck;
}

export const DeckBreakdown = ({ deck }: Props) => {
  const [isOpen, toggleIsOpen] = useToggle(true);

  return (
    <StyledWrapper isOpen={isOpen}>
      <Flex justify="space-between" onClick={toggleIsOpen} style={{ cursor: 'pointer' }}>
        <Typography.Title level={3} style={{ marginBottom: 0 }}>
          Breakdown
        </Typography.Title>
        <StyledButton
          type="primary"
          ghost
          icon={isOpen ? <MinusOutlined /> : <PlusOutlined />}
        />
      </Flex>
      {isOpen && (
        <>
          <Divider />
          <DeckBreakdownHeader deck={deck} />
          {deck && <DeckBreakdownBody deck={deck} />}
        </>
      )}
    </StyledWrapper>
  );
};
