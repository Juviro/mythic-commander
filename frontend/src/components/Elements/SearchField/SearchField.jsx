import React from 'react';
import { AutoComplete } from 'antd';
import CardContext from '../../CardProvider/CardProvider';
import filterNames from './filterNames';

export const splitAmountAndName = query => {
  const match = query.match(/^(\d*)x{0,1}\s{0,1}(.*)/);
  if (!match) return { name: query, amount: 1 };
  const [, matchedAmount, name] = match;
  const amount = Number(matchedAmount) || 1;
  return { amount, name };
};

const renderOption = (searchString, option) => {
  let currentSearchString = searchString;
  const highlightedoption = option.split('').map(char => {
    if (
      !currentSearchString.length ||
      char.toLowerCase() !== currentSearchString[0].toLowerCase()
    ) {
      return char;
    }
    currentSearchString = currentSearchString.substr(1);
    return <b key={Math.random()}>{char}</b>;
  });

  return (
    <AutoComplete.Option key={option} text={option}>
      {highlightedoption}
    </AutoComplete.Option>
  );
};

const getDropdownAlign = alignTop => {
  if (!alignTop) return undefined;
  return {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 0,
    },
  };
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
    const card = splitAmountAndName(searchString);
    onSearch({ ...card, name: value });
    if (resetSearch) this.setState({ searchString: '' });
  };

  render() {
    const {
      width = 250,
      alignTop = false,
      defaultActiveFirstOption,
    } = this.props;
    const { searchString } = this.state;
    const { cardNames = [] } = this.context;

    const searchStringWithoutAmount = splitAmountAndName(searchString).name;

    const suggestions = filterNames(
      cardNames.map(name => ({ name })),
      searchStringWithoutAmount
    ).map(({ name }) => name);
    const dataSource =
      suggestions[0] === searchString
        ? suggestions
        : suggestions.map(option =>
            renderOption(searchStringWithoutAmount, option)
          );

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
        style={{ width }}
        dropdownAlign={getDropdownAlign(alignTop)}
      />
    );
  }
}
