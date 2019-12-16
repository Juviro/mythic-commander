import React, { useState } from 'react'
import styled from 'styled-components'

import Table from './Table'
import CardPreview from './CardPreview/CardPreview'

const ListViewWrapper = styled.div`
  display: flex;
`

export default ({ cards, loading }) => {
  const [highlightedCard, setHighlightedCard] = useState(null)

  return (
    <ListViewWrapper>
      <CardPreview
        highlightedCard={cards.find(({ name }) => name === highlightedCard)}
        onHideCard={() => setHighlightedCard(null)}
      />
      <Table cards={cards} loading={loading} setHighlightedCard={setHighlightedCard} />
    </ListViewWrapper>
  )
}
