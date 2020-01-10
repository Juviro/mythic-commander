import React from 'react';
import { AutoComplete } from 'antd';
import CardContext from '../../CardProvider/CardProvider';
import filterNames from './filterNames';

const renderOption = (searchString, suggestion) => {
  let currentSearchString = searchString;
  const highlightedSuggestion = suggestion.split('').map(char => {
    if (!currentSearchString.length || char.toLowerCase() !== currentSearchString[0].toLowerCase()) {
      return char;
    }
    currentSearchString = currentSearchString.substr(1);
    return <b key={Math.random()}>{char}</b>;
  });

  return (
    <AutoComplete.Option key={suggestion} text={suggestion}>
      {highlightedSuggestion}
    </AutoComplete.Option>
  );
};

export default class SearchField extends React.Component {
  static contextType = CardContext;

  inputRef = React.createRef();

  state = {
    searchString: '',
  };

  setSearch = searchString => {
    this.setState({ searchString });
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  onSubmit = value => {
    const { onSearch, resetSearch } = this.props;
    const { searchString } = this.state;
    onSearch(value || searchString);
    if (resetSearch) this.setState({ searchString: '' });
  };

  render() {
    const { defaultActiveFirstOption } = this.props;
    const { searchString } = this.state;
    const { cardNames } = this.context;
    const suggestions = filterNames(cardNames, searchString);
    const dataSource =
      suggestions[0] === searchString ? suggestions : suggestions.map(option => renderOption(searchString, option));

    return (
      <AutoComplete
        autoFocus
        ref={this.inputRef}
        value={searchString}
        dataSource={dataSource}
        placeholder="Search for a card"
        defaultActiveFirstOption={defaultActiveFirstOption}
        onChange={val => this.setSearch(val)}
        onSelect={this.onSubmit}
        tabIndex={0}
        style={{ width: 250 }}
      />
    );
  }
}
