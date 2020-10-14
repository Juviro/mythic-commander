import React from 'react';
import { AutoComplete, Typography, Empty } from 'antd';
import styled from 'styled-components';
import CardContext from '../../../Provider/CardProvider';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';
import OwnedBadge from '../OwnedBadge';
import { useBlurOnEsc } from '../../../Hooks';
import Flex from '../Flex';
import FoilIcon from '../FoilIcon';

export const splitSearchString = (query, allowFoilInput = false) => {
  const matchAmount = query.match(/^(\d*)x{0,1}\s{0,1}(.*)/);
  const [, matchedAmount, nameWithoutAmount] = matchAmount || [null, null, query];

  const amount = Number(matchedAmount) || 1;

  if (!allowFoilInput) {
    return {
      amount,
      name: nameWithoutAmount,
    };
  }

  const matchFoil = nameWithoutAmount.match(/^\s*(foil)\s*([\w]+.*)$/);
  const [, matchedFoil, name] = matchFoil || [null, null, nameWithoutAmount];

  const isFoil = Boolean(matchedFoil);

  return { amount, name, isFoil };
};

const StyledOption = styled.span`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
`;

const getHighlightedOption = (
  searchString,
  cardName,
  containedCardNames = [],
  ownedCardNames = []
) => {
  let currentSearchString = searchString;
  const highlightedOption = cardName.split('').map((char) => {
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

const getDropdownAlign = (alignTop) => {
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

  setSearch = (searchString) => {
    this.setState({ searchString });
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  blur = () => {
    this.inputRef.current.blur();
  };

  onSubmit = (idAndName) => {
    const [id, name] = idAndName.split(';');
    const { onSearch, resetSearch, allowFoilInput } = this.props;
    const { searchString } = this.state;
    const { amount, isFoil } = splitSearchString(searchString, allowFoilInput);

    onSearch({ amount, id, isFoil }, name);
    const newValue = resetSearch ? '' : name;
    this.setState({ searchString: newValue });
  };

  render() {
    const {
      width = 250,
      autoFocus = true,
      alignTop = false,
      ownedCardNames,
      containedCardNames,
      defaultActiveFirstOption = true,
      placeholder = 'Search for a card',
      loading,
      cards: overrideCards,
      cardPrefix,
      allowFoilInput,
      getContainer,
    } = this.props;

    const { searchString } = this.state;
    const { cards = [] } = this.context;

    const { name, amount, isFoil } = splitSearchString(searchString, allowFoilInput);

    const suggestions = filterAndSortByQuery(overrideCards || cards, name).slice(0, 20);

    return (
      <AutoComplete
        autoFocus={autoFocus}
        ref={this.inputRef}
        value={searchString}
        onKeyDown={useBlurOnEsc}
        placeholder={placeholder}
        defaultActiveFirstOption={defaultActiveFirstOption}
        onChange={(val) => this.setSearch(val)}
        onSelect={this.onSubmit}
        tabIndex={0}
        style={{ width }}
        loading={loading}
        onFocus={(e) => e.target.select()}
        notFoundContent={<Empty description="No cards found" />}
        dropdownAlign={getDropdownAlign(alignTop)}
        getPopupContainer={getContainer}
      >
        {suggestions.map((option) => (
          <AutoComplete.Option
            text={option.name}
            style={{ display: 'flex' }}
            key={`${option.id};${option.name}`}
          >
            <Flex align="center">
              {amount > 1 && (
                <Typography.Text
                  strong
                  style={{ marginRight: 8 }}
                >{`${amount}x `}</Typography.Text>
              )}
              {isFoil && <FoilIcon style={{ marginRight: 6, marginLeft: 0 }} />}
              {cardPrefix}
              {getHighlightedOption(
                name,
                option.name,
                containedCardNames,
                ownedCardNames
              )}
            </Flex>
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    );
  }
}
