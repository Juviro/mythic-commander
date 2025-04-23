import React from 'react';
import styled from 'styled-components';

import ManaSymbol from './ManaSymbol';
import ReplaceText from '../ReplaceText';

export const StyledWrapper = styled.div`
  display: block;
  margin: 8px 0 16px;
`;

const replacementFunction = (manaIcon) => <ManaSymbol symbol={manaIcon} size={14} />;
const cursiveTextFunction = (cursiveText) => <i>{cursiveText}</i>;

const TextWithIcons = ({ text }) => {
  const addIcon = (unreplacedText) => (
    <ReplaceText
      text={unreplacedText}
      replacementPattern={/({[\w/]+}|^[+−]?[\dX]{1,2}:)/}
      replacementFunction={replacementFunction}
    />
  );

  return (
    <StyledWrapper>
      <ReplaceText
        text={text}
        replacementPattern={/\(.*\)/}
        textFormatter={addIcon}
        replacementFunction={cursiveTextFunction}
      />
    </StyledWrapper>
  );
};

export default React.memo(TextWithIcons);
