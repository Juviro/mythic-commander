import React from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-apollo'
import { getCollection, deleteFromCollection } from '../../../../queries'

const StyledCardPreview = styled.div`
  display: flex;
`

export default ({ card }) => {
  const [onDelete] = useMutation(deleteFromCollection)

  const options = [
    {
      name: 'Delete',
      onClick: () =>
        onDelete({
          variables: { cardId: card.id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteFromCollection: card.id,
          },
          update: (cache, { data: { deleteFromCollection } }) => {
            const newData = cache.readQuery({ query: getCollection })
            const collection = newData.collection.filter(({ id }) => id !== deleteFromCollection)
            cache.writeQuery({ query: getCollection, data: { collection } })
          },
        }),
    },
  ]

  return (
    <StyledCardPreview>
      {options.map((option, index) => (
        <div key={option.name}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={option.onClick}>{option.name}</a>
        </div>
      ))}
    </StyledCardPreview>
  )
}
