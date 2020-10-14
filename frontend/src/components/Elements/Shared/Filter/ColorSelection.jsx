import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { colors as colorIcons } from '../../../../assets/mtgIcons';
import Flex from '../Flex';

const colors = ['w', 'u', 'b', 'r', 'g'];

const addColor = (currentColors, newColor) => {
  if (!currentColors) return newColor;
  const findColorIndex = (colorLetter) =>
    colors.findIndex((letter) => letter === colorLetter);

  return currentColors
    .concat(newColor)
    .split('')
    .sort((a, b) => findColorIndex(a) - findColorIndex(b))
    .join('');
};

const getColorTagProps = (invert) => ({ isSelected }) => {
  const showSelectedStyle = invert ? !isSelected : isSelected;
  return showSelectedStyle
    ? `
        border: 2px solid #b37c00;
        filter: none;
      `
    : `
        border: 1px solid #333333;
        filter: grayscale(100%);
        opacity: 0.5;
      `;
};

const StyledColorTag = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 50%;
  margin: 0 2px;
  ${getColorTagProps(false)}

  &:active {
    ${getColorTagProps(true)}
  }
`;

export default ({ onChange, value = '' }) => {
  const isColorSelected = (letter) => value && value.includes(letter);

  const onSelectColor = (letter) => {
    const isSelected = isColorSelected(letter);
    const newColors = isSelected ? value.replace(letter, '') : addColor(value, letter);
    onChange(newColors);
  };

  const onSetExcluded = (symbol) => (e) => {
    const isExclude = e.target.checked;
    const withoutSymbol = value.replace(new RegExp(symbol, 'g'), '');
    const newColors = isExclude ? symbol.concat(withoutSymbol) : withoutSymbol;

    onChange(newColors);
  };

  return (
    <Flex direction="column">
      <Flex direction="row" justify="space-between" style={{ maxWidth: 250 }}>
        {colors.map((letter) => (
          <StyledColorTag
            key={letter}
            src={colorIcons[letter.toUpperCase()]}
            isSelected={isColorSelected(letter)}
            onClick={() => onSelectColor(letter)}
          />
        ))}
      </Flex>
      <div style={{ marginTop: 16 }}>
        <Checkbox
          disabled={value.includes('x')}
          checked={value.includes('-')}
          onChange={onSetExcluded('-')}
          style={{ marginRight: 16 }}
        >
          Exclude others
        </Checkbox>
        <Checkbox
          checked={value.includes('x')}
          onChange={onSetExcluded('x')}
          style={{ marginLeft: 0 }}
        >
          Exact match
        </Checkbox>
      </div>
    </Flex>
  );
};
