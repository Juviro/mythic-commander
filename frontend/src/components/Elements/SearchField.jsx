import React, { useState, useEffect, useRef } from 'react'
import { AutoComplete, Input, Icon } from 'antd'
import { getAutoComplete } from '../../network/mtgApi'

const isTouchDevice = 'ontouchstart' in window

export default ({ onSearch, defaultActiveFirstOption = false }) => {
  const [searchString, setSearch] = useState('')
  const [dataSource, setDataSource] = useState('')
  const inputEl = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const suggestions = await getAutoComplete(searchString)
      setDataSource(suggestions)
    }
    fetchData()
  }, [searchString])

  const onSubmit = value => {
    isTouchDevice && inputEl.current.blur()
    onSearch(value || searchString)
    setSearch('')
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
      onSearch={e => console.log('search', e)}
      onSelect={onSubmit}
      ref={inputEl}
      tabIndex={0}
      style={{ margin: 10 }}
    />
  )
  //   <Input
  //     onPressEnter={e => {
  //       e.persist()
  //       setTimeout(() => {
  //         onSubmit(e.target.value)
  //       }, 100)
  //     }}
  //     suffix={<Icon type="search" onClick={() => onSubmit()} />}
  //   />
  // </AutoComplete>
}
