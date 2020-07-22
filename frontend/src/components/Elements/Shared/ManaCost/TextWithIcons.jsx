import React from 'react';
import styled from 'styled-components';

import ManaSymbol from './ManaSymbol';
import ReplaceText from '../ReplaceText';

const StyledWrapper = styled.div`
  display: block;
  margin: 8px 0 16px;
`;

const TextWithIcons = ({ text }) => {
  const addIcon = unreplacedText => (
    <ReplaceText
      text={unreplacedText}
      replacementPattern={new RegExp(/({[\w/]+}|^[+−]?[\dX]{1,2}:)/)}
      replacementFunction={manaIcon => <ManaSymbol symbol={manaIcon} size={14} />}
    />
  );

  return (
    <StyledWrapper>
      <ReplaceText
        text={text}
        replacementPattern={new RegExp(/\(.*\)/)}
        textFormatter={addIcon}
        replacementFunction={cursiveText => <i>{cursiveText}</i>}
      />
    </StyledWrapper>
  );
};

export default React.memo(TextWithIcons);
