import React, { useState, useEffect, useRef } from 'react'
import { AutoComplete, Input, Icon } from 'antd'
import { getAutoComplete } from '../../network/mtgApi'

export default ({ onSearch }) => {
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
    onSearch(value || searchString)
  }

  return (
    <AutoComplete
      autoFocus
      dataSource={dataSource}
      placeholder="Search for a card"
      defaultActiveFirstOption={false}
      onChange={val => setSearch(val)}
      onSelect={onSubmit}
      ref={inputEl}
    >
      <Input
        onPressEnter={e => {
          e.persist()
          setTimeout(() => {
            onSubmit(e.target.value)
          }, 100)
        }}
        suffix={<Icon type="search" onClick={onSubmit} />}
      />
    </AutoComplete>
  )
}
