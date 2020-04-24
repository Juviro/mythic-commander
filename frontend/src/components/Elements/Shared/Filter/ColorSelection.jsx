import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { colors as colorIcons } from '../../../../assets/mtgIcons';

const colors = ['w', 'u', 'b', 'r', 'g'];

const addColor = (currentColors, newColor) => {
  if (!currentColors) return newColor;
  const findColorIndex = colorLetter =>
    colors.findIndex(letter => letter === colorLetter);

  return currentColors
    .concat(newColor)
    .split('')
    .sort((a, b) => findColorIndex(a) - findColorIndex(b))
    .join('');
};

const ColorSelectionWrapper = styled.div`
  max-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const getColorTagProps = invert => ({ isSelected }) => {
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
  const isColorSelected = letter => value && value.includes(letter);

  const onSelectColor = letter => {
    const isSelected = isColorSelected(letter);
    const newColors = isSelected
      ? value.replace(letter, '')
      : addColor(value, letter);
    onChange(newColors);
  };

  const onSetExcluded = symbol => e => {
    const isExclude = e.target.checked;
    const withoutSymbol = value.replace(new RegExp(symbol, 'g'), '');
    const newColors = isExclude ? symbol.concat(withoutSymbol) : withoutSymbol;

    onChange(newColors);
  };

  return (
    <ColorSelectionWrapper>
      {colors.map(letter => (
        <StyledColorTag
          key={letter}
          src={colorIcons[letter.toUpperCase()]}
          isSelected={isColorSelected(letter)}
          onClick={() => onSelectColor(letter)}
        />
      ))}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Checkbox
          style={{
            fontSize: '10px',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            marginLeft: 8,
            marginBottom: 5,
          }}
          disabled={value.includes('x')}
          checked={value.includes('-')}
          onChange={onSetExcluded('-')}
        >
          Exclude others
        </Checkbox>
        <Checkbox
          style={{
            fontSize: '10px',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            marginRight: '0',
          }}
          checked={value.includes('x')}
          onChange={onSetExcluded('x')}
        >
          Exact match
        </Checkbox>
      </div>
    </ColorSelectionWrapper>
  );
};
