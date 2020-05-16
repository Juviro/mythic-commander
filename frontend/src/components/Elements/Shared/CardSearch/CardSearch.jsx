import React from 'react';
import { AutoComplete, Typography } from 'antd';
import styled from 'styled-components';
import CardContext from '../../../Provider/CardProvider';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';
import OwnedBadge from '../OwnedBadge';
import { useBlurOnEsc } from '../../../Hooks';

export const splitAmountAndName = query => {
  const match = query.match(/^(\d*)x{0,1}\s{0,1}(.*)/);
  if (!match) return { name: query, amount: 1 };
  const [, matchedAmount, name] = match;
  const amount = Number(matchedAmount) || 1;
  return { amount, name };
};

const StyledOption = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledOptionWrapper = styled.div`
  display: flex;
`;

const getHighlightedOption = (
  searchString,
  cardName,
  containedCardNames = [],
  ownedCardNames = []
) => {
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

  const alreadyInList = containedCardNames.includes(cardName);
  const owned = ownedCardNames.includes(cardName);

  return (
    <StyledOption>
      <Typography.Text ellipsis>{highlightedOption}</Typography.Text>
      <span>
        {alreadyInList && (
          <Typography.Text type="warning">already in list</Typography.Text>
        )}
        {owned && <OwnedBadge />}
      </span>
    </StyledOption>
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

export default class CardSearch extends React.Component {
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
      autoFocus = true,
      alignTop = false,
      ownedCardNames,
      containedCardNames,
      defaultActiveFirstOption,
      placeholder = 'Search for a card',
    } = this.props;

    const { searchString } = this.state;
    const { cards = [] } = this.context;

    const { name, amount } = splitAmountAndName(searchString);

    const suggestions = filterAndSortByQuery(cards, name).slice(0, 20);

    return (
      <AutoComplete
        autoFocus={autoFocus}
        ref={this.inputRef}
        value={searchString}
        onKeyDown={useBlurOnEsc}
        placeholder={placeholder}
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
            style={{ display: 'flex' }}
            key={`${option.id};${option.name}`}
          >
            <StyledOptionWrapper>
              {amount > 1 && (
                <Typography.Text
                  strong
                  style={{ marginRight: 8 }}
                >{`${amount}x `}</Typography.Text>
              )}
              {getHighlightedOption(
                name,
                option.name,
                containedCardNames,
                ownedCardNames
              )}
            </StyledOptionWrapper>
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    );
  }
}
