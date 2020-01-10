import gql from 'graphql-tag';
import { CARD_FIELDS } from './collection';

const DECK_CARD_FIELDS = `
  ${CARD_FIELDS}
  primaryTypes
  subTypes
  flipTypes
  zone
`;

const DECK_FIELDS = `
    id
    name
    createdAt
    lastEdit
    imgSrc
    cards {
     ${DECK_CARD_FIELDS}
    }
`;

export const getDecks = gql`
  query decks {
    decks {
      ${DECK_FIELDS}
    }
  }
`;

export const getDeck = gql`
  query deck($id: String!) {
    deck(id: $id) {
      ${DECK_FIELDS}
    }
  }
`;

export const createDeck = gql`
  mutation createDeck {
    createDeck {
        ${DECK_FIELDS}
    }
  }
`;

export const addCardsToDeck = gql`
  mutation addCardsToDeck($cards: [String]!, $deckId: String!) {
    addCardsToDeck(input: { cards: $cards, deckId: $deckId }) {
      cards {
        ${DECK_CARD_FIELDS}
      }
      deckId
    }
  }
`;

export const createDeckHelper = {
  optimisticResponse: () => ({
    __typename: 'Mutation',
    createDeck: {
      id: Date.now(),
      name: 'loading...',
      imgSrc: null,
      lastEdit: Date.now(),
      createdAt: Date.now(),
      cards: [],
      __typename: 'Deck',
    },
  }),
  update: (cache, { data: { createDeck: createdDeck } }) => {
    const newData = cache.readQuery({ query: getDecks });

    if (createdDeck && newData) {
      newData.decks.push(createdDeck);
      cache.writeQuery({ query: getDecks, data: newData });
    }
  },
};

export const addToDeckHelper = {
  optimisticResponse: (cards, deckId) => ({
    __typename: 'Mutation',
    addCardsToDeck: {
      deckId,
      cards: cards.map(name => ({
        __typename: 'CardsType',
        id: `optimistic_${name}`,
        name,
        createdAt: Date.now(),
        set: '',
        image_uris: {
          normal: '',
          small: '',
          __typename: 'ImageUris',
        },
        legalities: {
          standard: null,
          modern: null,
          commander: null,
          __typename: 'legalities',
        },
        prices: {
          eur: null,
          usd: null,
          usd_foil: null,
          __typename: 'prices',
        },
        card_faces: null,
        isFoil: false,
        rarity: null,
        primaryTypes: null,
        subTypes: null,
        flipTypes: null,
        zone: null,
      })),
      __typename: 'Deck',
    },
  }),
  update: (
    cache,
    {
      data: {
        addCardsToDeck: { cards, deckId },
      },
    }
  ) => {
    const newData = cache.readQuery({ query: getDeck, variables: { id: deckId } });
    if (cards && newData) {
      cards.forEach(card => {
        const cardIndex = newData.deck.cards.findIndex(({ name }) => name === card.name);
        if (cardIndex > -1) {
          const duplicateCard = newData.deck.cards[cardIndex];
          newData.deck.cards.splice(cardIndex, 1);
          // TODO increase amount if used
          newData.deck.cards.push({ ...duplicateCard, createdAt: new Date() });
        } else {
          newData.deck.cards.push(card);
        }
      });
      cache.writeQuery({ query: getDeck, data: newData });
    }
  },
};
