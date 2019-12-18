import gql from 'graphql-tag'
import { CARD_FIELDS } from './collection'

const DECK_FIELDS = `
    id
    name
    createdAt
    lastEdit
    imgSrc
    cards {
      ${CARD_FIELDS}
    }
`

export const getDecks = gql`
  query decks {
    decks {
      ${DECK_FIELDS}
    }
  }
`

export const createDeck = gql`
  mutation createDeck {
    createDeck {
        ${DECK_FIELDS}
    }
  }
`

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
  update: (cache, { data: { createDeck } }) => {
    const newData = cache.readQuery({ query: getDecks })

    if (createDeck && newData) {
      newData.decks.push(createDeck)
      cache.writeQuery({ query: getDecks, data: newData })
    }
  },
}
