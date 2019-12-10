import React, { useState } from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import CardLoader from './CardSpinner'

const CardWrapper = styled.div`
  margin: 10px;
  width: 223px;
  height: 310px;
  display: flex;
  position: relative;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e3e3e3;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const SwapIcon = styled(Icon).attrs({
  type: 'sync',
})`
  position: absolute;
  top: 40px;
  left: 23px;
  font-size: 30px;
  color: white;
  background-color: black;
  border-radius: 50%;
  padding: 5px;
  opacity: 0.6;
`

export default card => {
  const isTwoFaced = !card.image_uris
  const [currentSide, setCurrentSide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const swapSides = () => {
    setCurrentSide(currentSide ? 0 : 1)
    setIsLoading(true)
  }

  if (!card.image_uris && !card.card_faces) {
    return (
      <CardWrapper>
        <CardLoader />
      </CardWrapper>
    )
  }

  const displayedCard = isTwoFaced ? card.card_faces[currentSide] : card

  return (
    <CardWrapper>
      <StyledImage alt={displayedCard.name} src={displayedCard.image_uris.normal} onLoad={() => setIsLoading(false)} />
      {isLoading && <CardLoader />}
      {isTwoFaced && !isLoading && <SwapIcon onClick={swapSides} />}
    </CardWrapper>
  )
}
