import React from 'react'
import styled from 'styled-components'
import { notification, Button } from 'antd'
import { getCollection } from '../../queries'

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledImage = styled.img`
  width: 200px;
`

const NotificationBody = ({ id, imageUrl, name, undoAdd }) => {
  const onUndo = () => {
    notification.close(id)
    undoAdd({
      variables: { cardId: id },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteFromCollection: id,
      },
      update: (cache, { data: { deleteFromCollection } }) => {
        const newData = cache.readQuery({ query: getCollection })
        const collection = newData.collection.filter(({ id }) => id !== deleteFromCollection)
        cache.writeQuery({ query: getCollection, data: { collection } })
      },
    })
  }

  return (
    <StyledContent>
      <StyledImageWrapper>
        <StyledImage src={imageUrl} />
      </StyledImageWrapper>
      <Button
        type="default"
        onClick={onUndo}
        style={{
          color: '#ca7203',
          backgroundColor: 'rgba(0,0,0,0)',
          margin: '20px 40px 0',
        }}
      >
        Undo
      </Button>
    </StyledContent>
  )
}

const NotificationHeader = ({ name }) => (
  <span>
    Added <b>{name}</b>!
  </span>
)

export default (id, imageUrl, name, undoAdd) => {
  notification.open({
    key: id,
    message: <NotificationHeader name={name} />,
    description: <NotificationBody id={id} imageUrl={imageUrl} name={name} undoAdd={undoAdd} />,
    style: { backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', width: 250 },
  })
}
