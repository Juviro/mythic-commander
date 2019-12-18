import gql from 'graphql-tag'
import { addedCard, addedCards } from '../components/Notifications'
import { getCardImageUri } from '../utils/card'

export const CARD_FIELDS = `
  id
  set
  name
  createdAt
  image_uris {
    small
    normal
  }
  card_faces {
    name
    image_uris {
      small
      normal
    }
  }
  prices {
    eur
    usd
    usd_foil
  }
  legalities {
    standard
    modern
    commander
  }
  isFoil

`

export const getCollection = gql`
  query getCollection {
    collection {
      ${CARD_FIELDS}
    }
  }
`

export const addToCollectionByName = gql`
  mutation addToCollectionByName($cards: [AddCardsByNameInput]!) {
    addToCollectionByName(cards: $cards) {
      ${CARD_FIELDS}
    }
  }
`

export const deleteFromCollection = gql`
  mutation deleteFromCollection($cardId: String!) {
    deleteFromCollection(cardId: $cardId)
  }
`
export const addToCollectionHelper = {
  optimisticResponse: cards => ({
    __typename: 'Mutation',
    addToCollectionByName: cards.map(card => ({
      __typename: 'Collection',
      id: `optimistic_${card.name}`,
      name: card.name,
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
    })),
  }),
  update: undoAdd => (cache, { data: { addToCollectionByName } }) => {
    const newData = cache.readQuery({ query: getCollection })
    if (addToCollectionByName && newData) {
      addToCollectionByName.forEach(card => {
        const cardIndex = newData.collection.findIndex(({ name }) => name === card.name)
        if (cardIndex > -1) {
          const duplicateCard = newData.collection[cardIndex]
          newData.collection.splice(cardIndex, 1)
          // TODO increase amount if used
          newData.collection.push({ ...duplicateCard, createdAt: new Date() })
        } else {
          newData.collection.push(card)
        }
      })
      cache.writeQuery({ query: getCollection, data: newData })

      const isOptimisticResponse = addToCollectionByName[0].id.startsWith('optimistic_')
      if (!isOptimisticResponse) {
        const isMultiAdd = addToCollectionByName.length > 1
        if (isMultiAdd) {
          addedCards(addToCollectionByName.map(({ name }) => name))
        } else {
          const [card] = addToCollectionByName
          addedCard(card.id, getCardImageUri(card), card.name, undoAdd)
        }
      }
    }
  },
}
