import React from 'react'
import styled from 'styled-components'
import CardView from '../Elements/CardView/CardView'
import SearchField from '../Elements/SearchField/SearchField'
import { useMutation } from 'react-apollo'
import { addToCollectionByName, getCollection } from './query'

const StyledOverview = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
`

const StyledSearchSection = styled.div`
  height: 100%;
  display: block;
`

const addCards = (mutate, cards) => {
  mutate({
    variables: { cards },
    optimisticResponse: {
      __typename: 'Mutation',
      addToCollectionByName: cards.map(card => ({
        __typename: 'Collection',
        id: card.name,
        name: card.name,
        createdAt: Date.now(),
        set: '',
        image_uris: {
          normal: '',
          __typename: 'ImageUris',
        },
        card_faces: null,
        isFoil: false,
      })),
    },
    update: (cache, { data: { addToCollectionByName } }) => {
      const newData = cache.readQuery({ query: getCollection })
      if (addToCollectionByName && newData) {
        addToCollectionByName.forEach(card => {
          const cardIndex = newData.collection.findIndex(({ name }) => name === card.name)
          if (cardIndex > -1) {
            const duplicateCard = newData.collection[cardIndex]
            newData.collection.splice(cardIndex, 1)
            // TODO increase amount
            newData.collection.push({ ...duplicateCard, createdAt: new Date() })
          } else {
            newData.collection.push(card)
          }
        })

        cache.writeQuery({ query: getCollection, data: newData })
      }
    },
  })
}

export default ({ cards }) => {
  const [mutate] = useMutation(addToCollectionByName)
  const onAddCard = cardName => {
    addCards(mutate, [{ name: cardName }])
  }
  console.log('cards', cards)

  return (
    <StyledOverview>
      <StyledSearchSection>
        <SearchField onSearch={onAddCard} defaultActiveFirstOption resetSearch />
      </StyledSearchSection>
      <CardView cards={cards} />
    </StyledOverview>
  )
}
