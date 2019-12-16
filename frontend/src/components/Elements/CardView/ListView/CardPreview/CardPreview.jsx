import React from 'react'
import styled from 'styled-components'
import Card from '../../Card'
import CardInfo from './CardInfo'
import { Affix } from 'antd'

const StyledCardPreview = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const getCardInfo = card => {
  const name = card.name
  const isTwoFaced = !card.image_uris
  return isTwoFaced
    ? card.card_faces.map((face, index) => ({
        name: `${name} face ${index}`,
        image: face.image_uris.normal,
      }))
    : [{ name, image: card.image_uris.normal }]
}

export default ({ highlightedCard, onHideCard }) => {
  if (!highlightedCard) return <StyledCardPreview />

  const cardInfos = getCardInfo(highlightedCard)

  return (
    <Affix offsetTop={10}>
      <StyledCardPreview onClick={onHideCard}>
        <ImageWrapper>
          {cardInfos.map(card => (
            <Card key={card.image} {...card} size={cardInfos.length === 1 ? 'normal' : 'small'} />
          ))}
        </ImageWrapper>
        <CardInfo card={highlightedCard} />
      </StyledCardPreview>
    </Affix>
  )
}
