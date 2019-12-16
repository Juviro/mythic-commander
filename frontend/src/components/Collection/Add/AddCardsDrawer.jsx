import React from 'react'
import { Drawer } from 'antd'
import styled from 'styled-components'
import { useMutation } from 'react-apollo'

import SearchField from '../../Elements/SearchField/SearchField'
import MultiInput from './MultiInput'
import { addToCollectionByName, addToCollectionHelper, deleteFromCollection } from '../../../queries'

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const StyledSearchSection = styled.div`
  height: 100%;
  display: block;
`

const addCards = (mutate, cards, undoAdd) => {
  mutate({
    variables: { cards },
    optimisticResponse: addToCollectionHelper.optimisticResponse(cards),
    update: addToCollectionHelper.update(undoAdd),
  })
}

export default ({ isVisible, setIsVisible }) => {
  let searchInput = React.createRef()
  const [mutate] = useMutation(addToCollectionByName)
  const [undoAdd] = useMutation(deleteFromCollection)

  const onAddCards = cardNames => {
    addCards(
      mutate,
      cardNames.map(name => ({ name })),
      undoAdd
    )
  }
  const afterVisibleChange = visible => {
    if (!visible) return
    searchInput.current.focus()
  }

  return (
    <Drawer
      width={300}
      mask={false}
      placement="left"
      title="Add Cards"
      visible={isVisible}
      maskClosable={false}
      onClose={() => setIsVisible(false)}
      afterVisibleChange={afterVisibleChange}
      style={{
        transition: 'all 1.5s linear',
      }}
    >
      <StyledWrapper>
        <StyledSearchSection>
          <SearchField ref={searchInput} onSearch={card => onAddCards([card])} defaultActiveFirstOption resetSearch />
          <MultiInput onAddCards={onAddCards} />
        </StyledSearchSection>
      </StyledWrapper>
    </Drawer>
  )
}
