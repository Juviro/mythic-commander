import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { RightOutlined, ArrowRightOutlined } from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { WantsList, CardInputType } from 'types/graphql';

import { Flex, Expander } from 'components/Elements/Shared';
import { greyBorder } from 'constants/colors';
import { Dropzone } from 'components/Elements/Desktop';
import { useMutation } from 'react-apollo';
import message from 'utils/message';
import { addCardsToWantsList, wantsListsForDeck } from './queries';
import DeckWantsList from './DeckWantsList';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4px;

  &:not(:last-child) {
    border-bottom: 1px solid ${greyBorder};
  }
`;

const StyledArrow = styled.div<{ active: boolean }>`
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
`;

interface Props {
  wantsList: WantsList;
  alreadyInDeck: (card: UnifiedCard) => boolean;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  active: boolean;
  onClick: () => void;
}

export default ({ wantsList, alreadyInDeck, onAddCards, active, onClick }: Props) => {
  const { id: deckId } = useParams<{ id: string }>();
  const [addToWantsList] = useMutation(addCardsToWantsList);

  const onAddToWantsList = (card) => {
    addToWantsList({
      variables: {
        cards: [{ id: card.id, amount: card.amount || 1 }],
        wantsListId: wantsList.id,
      },
      refetchQueries: [
        {
          query: wantsListsForDeck,
          variables: { deckId },
        },
      ],
    });
    message(`Added <b>${card.name}</b> cards to <b>${wantsList.name}</b>!`);
  };

  return (
    <StyledWrapper>
      <Dropzone
        onDrop={onAddToWantsList}
        listId={wantsList.id}
        style={{ borderRadius: 2 }}
      >
        <StyledHeader onClick={onClick}>
          <Flex direction="row" align="center">
            <StyledArrow active={active}>
              <RightOutlined />
            </StyledArrow>
            <Typography.Text strong style={{ fontSize: 16 }}>
              {wantsList.name}
            </Typography.Text>
          </Flex>
          <Link to={`/wants/${wantsList.id}`}>
            <ArrowRightOutlined />
          </Link>
        </StyledHeader>
        <Expander isExpanded={active}>
          <DeckWantsList
            wantsList={wantsList}
            alreadyInDeck={alreadyInDeck}
            onAddCards={onAddCards}
          />
        </Expander>
      </Dropzone>
    </StyledWrapper>
  );
};
