import React, { useContext, useEffect, useMemo } from 'react';

import { Deck, LandsSuggestionGroup, Query } from 'types/graphql';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import CardGrid from 'components/Elements/Shared/CardGrid';
import { LandsSuggestionSettings } from '../landSuggestions.types';
import { getLandsSuggestion } from '../LandSuggestionModal/queries';
import LandGroupTitle from './LandGroupTitle';
import LandSuggestionContext from '../LandSuggestionContext';

const StyledLoadingIcon = styled(LoadingOutlined)`
  justify-self: center;
  font-size: 24px;
  padding: 48px 0;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(90vh - 200px);
`;

const StyledCenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

interface LandSuggestionsProps {
  settings: LandsSuggestionSettings;
  deck: Deck;
}

const LandSuggestions = ({ settings, deck }: LandSuggestionsProps) => {
  const {
    setSelectedCardIds,
    setInitialSelection,
    selectedAmounts,
    setSelectedAmounts,
    selectedLandsWithAmount,
  } = useContext(LandSuggestionContext);
  const { data, loading } = useQuery<Query>(getLandsSuggestion, {
    variables: { deckId: deck.id, options: settings },
    fetchPolicy: 'network-only',
  });

  const initialSelection = useMemo(() => {
    if (!data) return [];
    return data.landsSuggestion.groups
      .map((group) =>
        group.lands
          .filter((land) => land.selected)
          .map(({ id, amount }) => ({ id, amount }))
      )
      .flat();
  }, [data]);

  useEffect(() => {
    if (!initialSelection) return;
    setInitialSelection(initialSelection);
  }, [Boolean(data)]);

  if (loading) {
    return (
      <StyledCenteredWrapper>
        <StyledLoadingIcon />
      </StyledCenteredWrapper>
    );
  }

  const getOnChangeAmount = (group: LandsSuggestionGroup) => {
    if (group.id === 'basicLands') {
      return (cardId: string, amount: number) => {
        setSelectedAmounts({ ...selectedAmounts, [cardId]: amount });
      };
    }
    return undefined;
  };

  const allCardsInOrder = data?.landsSuggestion.groups.map((group) => group.lands).flat();

  const cardLists = data?.landsSuggestion.groups.map((group) => ({
    key: group.name,
    type: group.name,
    onChangeAmount: getOnChangeAmount(group),
    title: (
      <LandGroupTitle
        title={group.name}
        id={group.id}
        totalCount={group.lands.length}
        selectedCount={group.lands.reduce((acc, land) => {
          const selectedCard = selectedLandsWithAmount.find(
            (card) => card.id === land.id
          );
          return acc + (selectedCard?.amount || 0);
        }, 0)}
      />
    ),
    cards: group.lands.map((land) => ({
      ...land,
      amount: selectedAmounts[land.id] || 1,
    })),
  }));

  return (
    <StyledWrapper>
      <CardGrid
        hidePagination
        hidePrices
        allowSettingDefaultCardVersion
        loading={loading}
        cards={allCardsInOrder}
        cardLists={cardLists}
        initialSelection={initialSelection.map(({ id }) => id)}
        onSelectCards={setSelectedCardIds}
        hideSelectionNavigation
      />
    </StyledWrapper>
  );
};

export default LandSuggestions;
