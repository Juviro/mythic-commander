import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RightOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { WantsList, CardInputType } from 'types/graphql';

import { Flex, Expander } from 'components/Elements/Shared';
import { greyBorder } from 'constants/colors';
import DeckWantsList from './DeckWantsList';

const StyledArrow = styled(RightOutlined)<{ active: boolean }>`
  margin-right: 4px;
  transition: all 0.3s;
  transform: rotate(${({ active }) => (active ? 90 : 0)}deg);
`;

const StyledHeader = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  cursor: pointer;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid ${greyBorder};
  }
`;

interface Props {
  wantsList: WantsList;
  alreadyInDeck: (card: UnifiedCard) => boolean;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  active: boolean;
  onClick: () => void;
}

export default ({ wantsList, alreadyInDeck, onAddCards, active, onClick }: Props) => {
  return (
    <Flex direction="column" style={{ width: '100%', padding: 8 }}>
      <StyledHeader onClick={onClick}>
        <Flex direction="row" align="center">
          <StyledArrow active={active} />
          <Typography.Text strong style={{ fontSize: 16 }}>
            {wantsList.name}
          </Typography.Text>
        </Flex>
        <Link to={`/wants/${wantsList.id}`}>
          <ArrowRightOutlined />
        </Link>
      </StyledHeader>
      <Expander isExpanded={active} destroyOnClose={false}>
        <DeckWantsList
          active
          wantsList={wantsList}
          alreadyInDeck={alreadyInDeck}
          onAddCards={onAddCards}
        />
      </Expander>
    </Flex>
  );
};

//   <StyledPanel
//   key={wantsList.id}
//   style={{ marginBottom: 8, width: '100%', position: 'relative' }}
//   extra={

//   }
//   header={<b>{`${wantsList.name} (${wantsList.cards.length})`}</b>}
// >
// </StyledPanel>
