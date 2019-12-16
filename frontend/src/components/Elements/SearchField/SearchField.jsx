import React from 'react'
import { AutoComplete } from 'antd'
import CardContext from '../../CardProvider/CardProvider'
import { filterNames } from './searchHelper'

const renderOption = (searchString, option) => {
  const highlightedOption = option.split('').map((char, index) => {
    if (!searchString.length || char.toLowerCase() !== searchString[0].toLowerCase()) {
      return char
    }
    searchString = searchString.substr(1)
    return <b key={index}>{char}</b>
  })

  return (
    <AutoComplete.Option key={option} text={option}>
      {highlightedOption}
    </AutoComplete.Option>
  )
}

export default class SearchField extends React.Component {
  static contextType = CardContext
  inputRef = React.createRef()
  state = {
    searchString: '',
  }

  setSearch = searchString => {
    this.setState({ searchString })
  }
  focus = () => {
    this.inputRef.current.focus()
  }

  onSubmit = value => {
    const { onSearch, resetSearch } = this.props
    onSearch(value || this.state.searchString)
    resetSearch && this.setState({ searchString: '' })
  }

  render() {
    const { defaultActiveFirstOption } = this.props
    const { searchString } = this.state
    const { cardNames } = this.context
    const dataSource = filterNames(cardNames, searchString)

    return (
      <AutoComplete
        autoFocus
        backfill
        ref={this.inputRef}
        value={searchString}
        dataSource={dataSource.map(option => renderOption(searchString, option))}
        placeholder="Search for a card"
        defaultActiveFirstOption={defaultActiveFirstOption}
        onChange={val => this.setSearch(val)}
        onSelect={this.onSubmit}
        tabIndex={0}
        style={{ width: 250 }}
      />
    )
  }
}
