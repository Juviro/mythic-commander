import React, { PropsWithChildren, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';
import useLocalStorage from 'components/Hooks/useLocalStorage';
import { LandsSuggestionSettings } from './landSuggestions.types';
import { getDeckDesktop, setLandsForDeck } from '../queries';

interface LandSelection {
  id: string;
  amount: number;
}

const INITIAL_SETTINGS: LandsSuggestionSettings = {
  numberOfLands: 37,
  ownedLandsOnly: true,
  minNumberOfBasics: 5,
};

interface ContextValue {
  displaySetings: boolean;
  setDisplaySetings: (displaySetings: boolean) => void;
  selectedCardIds: string[];
  setSelectedCardIds: (cardIds: string[]) => void;
  setInitialSelection: (selection: LandSelection[]) => void;
  selectedAmounts: Record<string, number>;
  setSelectedAmounts: (amounts: Record<string, number>) => void;
  numberOfSelectedLands: number;
  setIsOpen: (isOpen: boolean) => void;
  settings: LandsSuggestionSettings | null;
  setSettings: (settings: LandsSuggestionSettings | null) => void;
  selectedLandsWithAmount: LandSelection[];
  onSubmit: () => void;
  submitting: boolean;
}

const LandSuggestionContext = React.createContext<ContextValue>(
  // @ts-ignore - this is a default value, it will be overwritten by the provider
  {}
);

interface Props extends PropsWithChildren {
  setIsOpen: (isOpen: boolean) => void;
  deckId: string;
}

export const LandSuggestionContextProvider = ({ children, setIsOpen, deckId }: Props) => {
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [selectedAmounts, setSelectedAmounts] = useState<Record<string, number>>({});
  const [settings, setSettings] = useLocalStorage<LandsSuggestionSettings | null>(
    'land-suggestion-settings',
    INITIAL_SETTINGS
  );
  const [displaySetings, setDisplaySetings] = useState(true);

  const selectedLandsWithAmount = selectedCardIds.map((cardId) => ({
    id: cardId,
    amount: selectedAmounts[cardId] || 1,
  }));

  const [mutate, { loading: submitting }] = useMutation(setLandsForDeck, {
    refetchQueries: [{ query: getDeckDesktop, variables: { id: deckId } }],
    onCompleted: () => {
      setIsOpen(false);
    },
  });

  const onSubmit = () => {
    mutate({
      variables: {
        deckId,
        lands: selectedLandsWithAmount,
      },
    });
  };

  const setInitialSelection = (selection: LandSelection[]) => {
    setSelectedCardIds(selection.map(({ id }) => id));
    setSelectedAmounts(
      selection.reduce((acc, { id, amount }) => {
        if (amount === 1) return acc;
        return { ...acc, [id]: amount };
      }, {})
    );
  };

  const onSettingsChange = (newSettings: LandsSuggestionSettings) => {
    setSettings(newSettings);
    setDisplaySetings(false);
  };

  const value = useMemo(() => {
    return {
      selectedCardIds,
      setSelectedCardIds,
      setInitialSelection,
      selectedAmounts,
      setSelectedAmounts,
      numberOfSelectedLands: selectedLandsWithAmount.reduce(
        (acc, { amount }) => acc + amount,
        0
      ),
      setIsOpen,
      settings,
      setSettings: onSettingsChange,
      selectedLandsWithAmount,
      onSubmit,
      submitting,
      displaySetings,
      setDisplaySetings,
    };
  }, [
    selectedCardIds,
    selectedAmounts,
    setIsOpen,
    settings,
    setSettings,
    onSubmit,
    submitting,
    displaySetings,
    setDisplaySetings,
  ]);

  return (
    <LandSuggestionContext.Provider value={value}>
      {children}
    </LandSuggestionContext.Provider>
  );
};

export default LandSuggestionContext;
