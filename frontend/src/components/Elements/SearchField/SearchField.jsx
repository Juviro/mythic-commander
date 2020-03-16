import React from 'react';
import { AutoComplete } from 'antd';
import CardContext from '../../CardProvider/CardProvider';
import { filterAndSortByQuery } from '../../../utils/cardFilter';

export const splitAmountAndName = query => {
  const match = query.match(/^(\d*)x{0,1}\s{0,1}(.*)/);
  if (!match) return { name: query, amount: 1 };
  const [, matchedAmount, name] = match;
  const amount = Number(matchedAmount) || 1;
  return { amount, name };
};

const getHighlightedOption = (searchString, cardName) => {
  let currentSearchString = searchString;
  const highlightedOption = cardName.split('').map(char => {
    if (
      !currentSearchString.length ||
      char.toLowerCase() !== currentSearchString[0].toLowerCase()
    ) {
      return char;
    }
    currentSearchString = currentSearchString.substr(1);
    return <b key={Math.random()}>{char}</b>;
  });

  return highlightedOption;
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

  onSubmit = idAndName => {
    const [id, name] = idAndName.split(';');
    const { onSearch, resetSearch } = this.props;
    const { searchString } = this.state;
    const { amount } = splitAmountAndName(searchString);
    onSearch({ amount, id }, name);
    if (resetSearch) this.setState({ searchString: '' });
  };

  render() {
    const {
      width = 250,
      alignTop = false,
      defaultActiveFirstOption,
    } = this.props;

    const { searchString } = this.state;
    const { cards = [] } = this.context;

    const searchStringWithoutAmount = splitAmountAndName(searchString).name;

    const suggestions = filterAndSortByQuery(cards, searchStringWithoutAmount);

    return (
      <AutoComplete
        autoFocus
        ref={this.inputRef}
        value={searchString}
        placeholder="Search for a card"
        defaultActiveFirstOption={defaultActiveFirstOption}
        onChange={val => this.setSearch(val)}
        onSelect={this.onSubmit}
        tabIndex={0}
        style={{ width }}
        dropdownAlign={getDropdownAlign(alignTop)}
      >
        {suggestions.map(option => (
          <AutoComplete.Option
            text={option.name}
            key={`${option.id};${option.name}`}
          >
            {getHighlightedOption(searchString, option.name)}
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    );
  }
}
