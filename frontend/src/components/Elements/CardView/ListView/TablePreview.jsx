import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

const StyledImage = styled.img`
  height: 100%;
`

const StyledPreviewWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledImageWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  ${StyledImage}:nth-child(2) {
    margin-left: 10px;
  }
`

const CardPreview = ({ images }) => {
  return (
    <StyledImageWrapper>
      {images.map(image => (
        <StyledImage src={image.small} key={image.small} />
      ))}
    </StyledImageWrapper>
  )
}

export default ({ images }) => {
  const hasImageUrl = images[0].small
  return (
    <StyledPreviewWrapper>{hasImageUrl ? <CardPreview images={images} size="small" /> : <Spin />}</StyledPreviewWrapper>
  )
}
