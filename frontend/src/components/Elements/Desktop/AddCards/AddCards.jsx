import React, { useState } from 'react';
import styled from 'styled-components';

import { Flex } from 'components/Elements/Shared';
import { SearchOutlined } from '@ant-design/icons';
import { primary } from 'constants/colors';
import SearchSettings from './AdvancedSearch/SearchSettings';
import SingleInput from './SingleInput';

const StyledSingleInputWrapper = styled.div`
  width: 500px;
`;

const StyledSetSelectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 24px;
  width: 500px;
`;

const StyledLabel = styled.div`
  white-space: nowrap;
  margin-right: 16px;
`;

export default ({ onAddCards }) => {
  const [cardOptions, setCardOptions] = useState({});

  return (
    <Flex direction="row" wrap="wrap">
      <StyledSingleInputWrapper>
        <SingleInput
          isAdvanced
          allowFoilInput
          autoFocus={false}
          onAddCards={onAddCards}
          cardOptions={cardOptions}
          placeholder={'Add cards, e.g. "2x foil negate"'}
          inputProps={{
            size: 'large',
            suffix: <SearchOutlined />,
            style: { borderColor: primary },
          }}
        />
      </StyledSingleInputWrapper>
      <StyledSetSelectionWrapper>
        <StyledLabel>Filter by Set</StyledLabel>
        <SearchSettings setCardOptions={setCardOptions} onAddCards={onAddCards} />
      </StyledSetSelectionWrapper>
    </Flex>
  );
};
