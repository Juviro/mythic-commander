import React, { useState } from 'react';
import styled from 'styled-components';

import Flex from 'components/Elements/Shared/Flex';
import { SearchOutlined } from '@ant-design/icons';
import { primary } from 'constants/colors';
import { Typography } from 'antd';
import SearchSettings from './AdvancedSearch/SearchSettings';
import SingleInput from './SingleInput';

const StyledSingleInputWrapper = styled.div`
  ${({ width }) => `width: ${width}px`};
  max-width: 100%;

  @media (max-width: 1200px) {
    width: 350px;
  }
  @media (max-width: 1000px) {
    width: 290px;
  }
`;

const StyledSetSelectionWrapper = styled(StyledSingleInputWrapper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const StyledLabel = styled(Typography.Text)`
  white-space: nowrap;
  margin-right: 16px;
`;

const AddCards = ({
  containedCardNames,
  onAddCards,
  isAdvanced = false,
  focusId,
  alignTop = false,
  width = 500,
  allowFoilInput = true,
  additionalOptions = [],
  autoFocus = false,
  placeholder = 'Add cards, e.g. "2x foil negate"',
}) => {
  const [cardOptions, setCardOptions] = useState({});

  return (
    <Flex direction="column">
      <StyledSingleInputWrapper width={width}>
        <SingleInput
          isAdvanced
          focusId={focusId}
          allowFoilInput={allowFoilInput}
          autoFocus={autoFocus}
          onAddCards={onAddCards}
          additionalOptions={additionalOptions}
          cardOptions={cardOptions}
          alignTop={alignTop}
          placeholder={placeholder}
          containedCardNames={containedCardNames}
          inputProps={{
            size: 'large',
            suffix: <SearchOutlined />,
            style: { borderColor: primary },
          }}
        />
      </StyledSingleInputWrapper>
      {isAdvanced && (
        <StyledSetSelectionWrapper width={width}>
          <StyledLabel>Filter by Set</StyledLabel>
          <SearchSettings setCardOptions={setCardOptions} />
        </StyledSetSelectionWrapper>
      )}
    </Flex>
  );
};

export default AddCards;
