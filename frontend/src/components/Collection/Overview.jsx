import React from 'react'
import styled from 'styled-components'
import Cards from '../Elements/Cards'
import SearchField from '../Elements/SearchField'

const StyledOverview = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px;
  display: flex;
`

const StyledSearchSection = styled.div`
  height: 100%;
  display: block;
`

export default ({ cards }) => {
  const onAddCard = cardName => {
    console.log('adding', cardName)
  }
  return (
    <StyledOverview>
      <StyledSearchSection>
        <SearchField onSearch={onAddCard} defaultActiveFirstOption />
      </StyledSearchSection>
      <Cards cards={cards} />
    </StyledOverview>
  )
}
