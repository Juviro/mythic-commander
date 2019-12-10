import React, { useState, useRef } from 'react'
import { AutoComplete } from 'antd'
import CardContext from '../../CardProvider/CardProvider'
import { filterNames } from './searchHelper'

const isTouchDevice = 'ontouchstart' in window

export default ({ onSearch, defaultActiveFirstOption = false, resetSearch = false }) => {
  const [searchString, setSearch] = useState('')
  const inputEl = useRef(null)

  const { cardNames } = React.useContext(CardContext)
  const dataSource = filterNames(cardNames, searchString)

  const onSubmit = value => {
    isTouchDevice && inputEl.current.blur()
    onSearch(value || searchString)
    resetSearch && setSearch('')
  }

  return (
    <AutoComplete
      autoFocus
      backfill
      value={searchString}
      dataSource={dataSource}
      placeholder="Search for a card"
      defaultActiveFirstOption={defaultActiveFirstOption}
      onChange={val => setSearch(val)}
      onSelect={onSubmit}
      ref={inputEl}
      tabIndex={0}
      style={{ margin: 10, width: 250 }}
    />
  )
}
