import {
  AlternativeCommander,
  LobbyDeck,
  PreconDeck,
} from 'backend/lobby/GameLobby.types';
import GameBrowserContext from 'components/GameBrowser/GameBrowserContext';
import useLocalStorage from 'hooks/useLocalStorage';
import { useContext } from 'react';
import { InitialDeck } from '../useDeckSelection';

const getOptions = (alternativeCommanders: AlternativeCommander[], deck: PreconDeck) => {
  if (!alternativeCommanders) return [];

  const { commanders, partners } = alternativeCommanders.reduce(
    (
      acc: {
        commanders: AlternativeCommander[];
        partners: AlternativeCommander[];
      },
      commander
    ) => {
      if (commander.isPartner) {
        acc.partners.push(commander);
      } else {
        acc.commanders.push(commander);
      }
      return acc;
    },
    {
      commanders: [],
      partners: [],
    }
  );

  const defaultCommander = {
    id: deck.commanders.map((commander) => commander.id).join(','),
    name: deck.commanderName,
  };

  const options = [defaultCommander, ...commanders];

  if (partners.length > 0) {
    options.push({
      id: partners.map((partner) => partner.id).join(','),
      name: partners.map((partner) => partner.name).join(' & '),
    });
  }

  return options.map((commander) => ({
    label: commander.name,
    value: commander.id,
  }));
};

const useCommanderSelection = (deck: LobbyDeck | PreconDeck) => {
  const { onSelectDeck, currentLobby } = useContext(GameBrowserContext);

  const [initialDeck, setInitialDeck] = useLocalStorage<InitialDeck>(
    'initial-deck-with-commanders'
  );

  const alternativeCommanders =
    'alternativeCommanders' in deck && deck.alternativeCommanders;

  if (!alternativeCommanders) return { options: [] };

  const onSelect = (commanderId: string) => {
    const currentDeck = currentLobby?.players.find(
      (player) => player.id === currentLobby.hostId
    )?.deck;

    if (!currentDeck) return;

    const commanderIds = commanderId.split(',');
    onSelectDeck({ ...currentDeck, commanderIds });
    setInitialDeck({ deckId: currentDeck.id, commanderId });
  };

  const options = getOptions(alternativeCommanders, deck);

  return {
    options,
    defaultValue: initialDeck?.commanderId || options[0].value,
    onSelect,
  };
};

export default useCommanderSelection;
