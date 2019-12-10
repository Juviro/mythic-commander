import React from 'react'
import styled from 'styled-components'

import ListView from './ListView/ListView'

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: 100%;
  width: 100%;
`

export default ({ cards, loading }) => {
  return (
    <CardsWrapper>
      <ListView loading={loading} cards={cards} />
    </CardsWrapper>
  )
}
