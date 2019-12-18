import React from 'react'
import styled from 'styled-components'
import { notification } from 'antd'

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`

const NotificationBody = ({ names }) => {
  return (
    <StyledContent>
      {names.map(name => (
        <span key={name}>{name}</span>
      ))}
    </StyledContent>
  )
}

const NotificationHeader = ({ length }) => <span>Added {length} Cards</span>

export default names => {
  notification.open({
    message: <NotificationHeader length={names.length} />,
    description: <NotificationBody names={names} />,
    style: { backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', width: 300 },
  })
}
