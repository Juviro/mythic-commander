import React from 'react';
import { AutoComplete, Typography, Empty, Input } from 'antd';
import styled from 'styled-components';
import getDropdownAlign from 'utils/getDropdownAlign';
import CardContext from '../../../Provider/CardProvider';
import { filterAndSortByQuery } from '../../../../utils/cardFilter';
import OwnedBadge from '../OwnedBadge';
import { useBlurOnEsc } from '../../../Hooks';
import Flex from '../Flex';
import FoilIcon from '../FoilIcon';

export const splitSearchString = (query = '', allowFoilInput = false) => {
  const matchAmount = query.match(/^((\d+)x{0,1}){0,1}\s{0,1}(.*)/);
  const [, , matchedAmount, nameWithoutAmount] = matchAmount || [null, null, query];

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
  const highlightedOption = [];
  let currentCardName = cardName;
  searchString
    .toLowerCase()
    .split(' ')
    .forEach((searchWord) => {
      const index = currentCardName.toLowerCase().indexOf(searchWord);
      if (index === -1) return;
      highlightedOption.push(currentCardName.slice(0, index));
      highlightedOption.push(
        <b key={Math.random()}>
          {currentCardName.slice(index, index + searchWord.length)}
        </b>
      );
      currentCardName = currentCardName.slice(index + searchWord.length);
    });
  highlightedOption.push(currentCardName);

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

  onSubmit = (idAndName, suggestions) => {
    const [id, name] = idAndName.split(';');
    const card = suggestions.find(({ id: cardId }) => id === cardId);
    const { onSearch, resetSearch, allowFoilInput } = this.props;
    const { searchString } = this.state;
    const { amount, isFoil } = splitSearchString(searchString, allowFoilInput);

    onSearch({ ...card, amount, id, isFoil }, name);
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
      inputProps,
      additionalOptions,
    } = this.props;

    const { searchString } = this.state;
    const { cards = [] } = this.context;

    const allOptions = additionalOptions?.length
      ? cards.concat(additionalOptions)
      : cards;

    const { name, amount, isFoil } = splitSearchString(searchString, allowFoilInput);

    const suggestions = filterAndSortByQuery(overrideCards || allOptions, name).slice(
      0,
      30
    );

    const renderOption = (option) => (
      <Flex align="center">
        {amount > 1 && (
          <Typography.Text
            strong
            style={{ marginRight: 8 }}
          >{`${amount}x `}</Typography.Text>
        )}
        {isFoil && <FoilIcon style={{ marginRight: 6, marginLeft: 0 }} />}
        {cardPrefix}
        {getHighlightedOption(name, option.name, containedCardNames, ownedCardNames)}
      </Flex>
    );

    const options = suggestions.map((option) => ({
      label: renderOption(option),
      value: `${option.id};${option.name}`,
    }));

    return (
      <AutoComplete
        autoFocus={autoFocus}
        ref={this.inputRef}
        value={searchString}
        onKeyDown={useBlurOnEsc}
        defaultActiveFirstOption={defaultActiveFirstOption}
        onChange={(val) => this.setSearch(val)}
        onSelect={(val) => this.onSubmit(val, suggestions)}
        tabIndex={0}
        style={{ width }}
        loading={loading}
        onFocus={(e) => e.target.select()}
        notFoundContent={<Empty description="No cards found" />}
        dropdownAlign={getDropdownAlign(alignTop)}
        getPopupContainer={getContainer}
        options={options}
      >
        <Input prefix={cardPrefix} placeholder={placeholder} {...inputProps} />
      </AutoComplete>
    );
  }
}
