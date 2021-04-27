import React, { useState } from 'react';
import styled from 'styled-components';

import { Flex } from 'components/Elements/Shared';
import { SearchOutlined } from '@ant-design/icons';
import { primary } from 'constants/colors';
import { Typography } from 'antd';
import SearchSettings from './AdvancedSearch/SearchSettings';
import SingleInput from './SingleInput';

const StyledSingleInputWrapper = styled.div`
  width: 500px;
`;

const StyledSetSelectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
  margin-top: 12px;
`;

const StyledLabel = styled(Typography.Text)`
  white-space: nowrap;
  margin-right: 16px;
`;

export default ({
  containedCardNames,
  onAddCards,
  isAdvanced = false,
  focusId,
  placeholder = 'Add cards, e.g. "2x foil negate"',
}) => {
  const [cardOptions, setCardOptions] = useState({});

  return (
    <Flex direction="column">
      <StyledSingleInputWrapper>
        <SingleInput
          isAdvanced
          focusId={focusId}
          allowFoilInput
          autoFocus={false}
          onAddCards={onAddCards}
          cardOptions={cardOptions}
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
        <StyledSetSelectionWrapper>
          <StyledLabel>Filter by Set</StyledLabel>
          <SearchSettings setCardOptions={setCardOptions} />
        </StyledSetSelectionWrapper>
      )}
    </Flex>
  );
};
