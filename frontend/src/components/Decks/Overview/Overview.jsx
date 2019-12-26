import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import { useQuery } from 'react-apollo'
import { getDecks } from '../../../queries'
import DeckPreview from './DeckPreview'
import CreateDeck from './CreateDeck'

const StyledOverview = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
`

const StyledSpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const byLastEdit = (a, b) => b.lastEdit - a.lastEdit

export default ({ history }) => {
  const { data, isLoading } = useQuery(getDecks)
  const decks =
    data &&
    data.decks
      .sort(byLastEdit)
      .map(deck => <DeckPreview key={deck.id} {...deck} onOpenDeck={() => onOpenDeck(deck.id)} />)

  const onOpenDeck = id => {
    history.push(`/deck/${id}`)
  }
  return (
    <StyledOverview>
      {isLoading || !data ? (
        <StyledSpinnerWrapper>
          <Spin />
        </StyledSpinnerWrapper>
      ) : (
        [<CreateDeck onOpenDeck={onOpenDeck} key={0} />, ...decks]
      )}
    </StyledOverview>
  )
}
