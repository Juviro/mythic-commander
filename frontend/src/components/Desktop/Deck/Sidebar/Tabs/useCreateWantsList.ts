import { createLinkedWantsList } from 'components/Mobile/Deck/LinkedWants/queries';
import { useMutation } from '@apollo/client';
import { MutationCreateWantsListArgs } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { getDeckDesktop } from '../../queries';

const DUMMY_ID = 'DUMMY';

const useCreateWantsList = (deck: UnifiedDeck, setCurrentTabId: (id: string) => void) => {
  const [mutateAddWantsList] = useMutation<any, MutationCreateWantsListArgs>(
    createLinkedWantsList
  );

  const onCreateWantsList = async () => {
    setCurrentTabId(DUMMY_ID);
    const result = await mutateAddWantsList({
      variables: { deckId: deck.id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        createWantsList: {
          __typename: 'wantsList',
          id: DUMMY_ID,
          name: deck.name,
          lastEdit: Date.now(),
          numberOfCards: 0,
          cards: [],
        },
      }),
      update: (cache, { data: { createWantsList } }) => {
        const existing = cache.readQuery<any>({
          query: getDeckDesktop,
          variables: { id: deck.id },
        });

        cache.writeQuery({
          query: getDeckDesktop,
          variables: { id: deck.id },
          data: {
            deck: {
              ...existing.deck,
              wantsLists: [...existing.deck.wantsLists, createWantsList],
            },
          },
        });
      },
    });
    const newId = result.data.createWantsList.id;
    setCurrentTabId(newId);
  };

  return { onCreateWantsList };
};

export default useCreateWantsList;
