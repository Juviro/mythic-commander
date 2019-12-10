import React, { useState } from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'

const StyledPreview = styled.div`
  display: flex;
  position: absolute;
  max-width: 200px;
`

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const IconWrapper = styled.div`
  padding: 0px 7px;
`

const CardPreview = ({ images, hidePreview }) => {
  return (
    <StyledPreview onClick={hidePreview}>
      {images.map(image => (
        <StyledImage src={image.normal} key={image} />
      ))}
    </StyledPreview>
  )
}

export default ({ images }) => {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div>
      <IconWrapper
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onClick={() => setShowPreview(true)}
      >
        <Icon type="camera" />
      </IconWrapper>
      {showPreview && <CardPreview images={images} hidePreview={() => setShowPreview(false)} />}
    </div>
  )
}
